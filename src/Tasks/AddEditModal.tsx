import React, { useState, useEffect } from 'react';
import {
    Button,
    Col,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Label,
    Form,
    Input,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { TaskService } from '../services/TaskService';

interface AddEditModalProps {
    task: any;
    openAddEditModal: boolean;
    setOpenAddEditModal: any;
    setUpdateTable: any;
    updateTable: boolean;
    statusSelection: any;
    action: string
}

export const AddEditModal: React.FC<AddEditModalProps> = ({
    task,
    openAddEditModal,
    setOpenAddEditModal,
    setUpdateTable,
    updateTable,
    statusSelection,
    action
}) => {
    const taskService = TaskService();
    const { handleSubmit, control, formState: { errors }, reset, clearErrors } = useForm();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    useEffect(() => {
        reset()
        clearErrors()
    }, [openAddEditModal])
    const saveTask = (taskData: any) => {
        taskData.status = taskData.status?.value;
        setButtonDisabled(true)
        if (action == 'add') {
            taskService.postTask(taskData, setButtonDisabled, setUpdateTable, updateTable, setOpenAddEditModal)
        } else {
            taskService.putTask(task.id, taskData, setButtonDisabled, setUpdateTable, updateTable, setOpenAddEditModal)
        }
    }

    return (
        <Modal isOpen={openAddEditModal} backdrop="static" size="lg">
            <ModalHeader>{action == "edit" ? "Edit" : "Add"} Task</ModalHeader>
            <Form onSubmit={handleSubmit(saveTask)}>
                <ModalBody>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={task.name}
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            type="text"
                                            name="name"
                                            defaultValue={task.name}
                                            invalid={!!errors.name}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <div className='d-flex justify-content-between'>
                                    <Label>Name <span className='text-danger'>*</span></Label>
                                    <small className="text-danger text-left">
                                        {errors?.name && errors?.name.type === "required" && "Name is required"}
                                    </small>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md="6" xs="12">
                            <FormGroup>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={action == 'add' ? { value: 0, label: 'PENDING' } : task.status}
                                    render={({ field: { onChange } }) => (
                                        <Select
                                            defaultValue={action == 'add' ? { value: 0, label: 'PENDING' } : task.status}
                                            options={statusSelection}
                                            onChange={onChange}
                                            isClearable={true}
                                            isDisabled={action == 'add'}
                                        />
                                    )}
                                />
                                <div className='d-flex justify-content-between'>
                                    <Label>Status <span className='text-danger'>*</span></Label>
                                    <small className="text-danger">
                                        {errors?.status && errors.status.type === "required" && "Status is required"}
                                    </small>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md="2" xs="12">
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={buttonDisabled} color="success">Save</Button>
                    <Button onClick={() => setOpenAddEditModal(false)}>Close</Button>
                </ModalFooter>
            </Form>

        </Modal>
    )
}