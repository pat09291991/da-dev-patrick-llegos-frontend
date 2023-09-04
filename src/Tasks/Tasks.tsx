import { useEffect, useState } from 'react';
import {
    CardHeader,
    CardBody,
    Card,
    Row,
    Col,
    Container,
    Button,
    FormGroup,
    Input,
    Label,
    Form
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskService } from '../services/TaskService';
import { AddEditModal } from './AddEditModal';
import ReactTable from '../components/ReactTable';
import Select from "react-select";

interface TodoItem {
    id: number;
    name: string;
    status: ''
}

export const Tasks = () => {
    const taskService = TaskService();
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [data, setData] = useState<string[]>([]);
    const [action, setAction] = useState<string>("");
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentpage, setCurrentPage] = useState<number>(1);
    const [sizePerPageQuery, setSizePerPageQuery] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false);

    const [filters, setFilters] = useState<object>({
        searchText: '',
        status: ''
    })

    const statusSelection = [
        { value: 0, label: "PENDING" },
        { value: 1, label: "COMPLETED" }
    ];

    const blankTask: TodoItem = {
        id: 0,
        name: '',
        status: ''
    };
    const [task, setTask] = useState<TodoItem>(blankTask);

    useEffect(() => {
        setLoading(true);
        taskService.getTasks(
            setData,
            setPageCount,
            currentpage,
            sizePerPageQuery,
            setLoading,
            filters
        );
    }, [currentpage, sizePerPageQuery, updateTable, filters]);



    const toggleAddEdit = (act: string, id: number) => {
        setAction('')
        setTask(blankTask)
        if (!openAddEditModal) {
            setAction(act)
            if (act == "add") {
                setOpenAddEditModal(!openAddEditModal)
            } else {
                setButtonDisabled(true)
                taskService.getTask(id, setTask, setOpenAddEditModal, setButtonDisabled)
            }
        } else {
            setOpenAddEditModal(!openAddEditModal)
        }
    }

    const onPageChange = (pageNumber: number) => {
        // Update the currentPage when a pagination link is clicked
        setCurrentPage(pageNumber);
    };

    const onSizePerChange = (pageSize: number) => {
        setSizePerPageQuery(pageSize)
    }

    const toggleDelete = (id: number) => {
        setButtonDisabled(true)
        taskService.deleteTask(id, setButtonDisabled, setUpdateTable, updateTable)
    }

    const handleFilter = (filterData: any) => {
        const search = filterData?.searchText ?? "";
        const status = filterData.status ? filterData.status.value : '';
        setFilters({ ...filters, searchText: search, status: status })
        setCurrentPage(1)
    }

    return (
        <>
            <AddEditModal
                task={task}
                openAddEditModal={openAddEditModal}
                setOpenAddEditModal={setOpenAddEditModal}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
                statusSelection={statusSelection}
                action={action}
            />
            <Container>
                <Card>
                    <CardHeader>To Do List</CardHeader>
                    <CardBody>
                        <Row className='mb-3'>
                            <Col md="12">
                                <Button color="success" onClick={() => toggleAddEdit('add', 0)}>Add New Task</Button>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit(handleFilter)}>
                            <Row className='mb-3'>
                                <Col xs="12" md="4">
                                    <FormGroup>
                                        <Controller
                                            name="searchText"
                                            control={control}
                                            rules={{ required: false }}
                                            defaultValue={task.name}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    type="text"
                                                    name="searchText"
                                                    defaultValue={""}
                                                    invalid={!!errors.searchText}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <Label>Search by: Name</Label>
                                    </FormGroup>
                                </Col>
                                <Col md="2" xs="12">
                                    <FormGroup>
                                        <Controller
                                            name="status"
                                            control={control}
                                            rules={{ required: false }}
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
                                        <Label>Filter by Status</Label>
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <Button disabled={loading || buttonDisabled}>Filter</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col md="12" xs="12">
                                <ReactTable
                                    data={data}
                                    loading={loading}
                                    buttonDisabled={buttonDisabled}
                                    toggleAddEdit={toggleAddEdit}
                                    toggleDelete={toggleDelete}
                                    currentPage={currentpage}
                                    totalPages={pageCount}
                                    onPageChange={onPageChange}
                                    onSizePerChange={onSizePerChange}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}
