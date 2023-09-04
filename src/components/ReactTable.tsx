import {
    Table,
    Spinner,
    UncontrolledTooltip,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Col
} from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import Select from "react-select";

interface ReactTableProps {
    data: any;
    loading: boolean;
    buttonDisabled: boolean;
    toggleAddEdit: any;
    toggleDelete: any;
    currentPage: any;
    totalPages: any;
    onPageChange: any;
    onSizePerChange: any;
}

const ReactTable: React.FC<ReactTableProps> = ({
    data,
    loading,
    buttonDisabled,
    toggleAddEdit,
    toggleDelete,
    currentPage,
    totalPages,
    onPageChange,
    onSizePerChange
}) => {

    return (
        <>
            <Table bordered striped className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Date Added</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ?
                        <>
                            {data && data.length ?
                                <>
                                    {data.map((task: any, i: number) => {
                                        let key = i + 1;
                                        return (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{task.name}</td>
                                                <td>{task.created_at}</td>
                                                <td>{task.status}</td>
                                                <td>
                                                    {!buttonDisabled ?
                                                        <>
                                                            <FiEdit
                                                                style={{ fontSize: "2rem", cursor: "pointer" }}
                                                                color="warning"
                                                                className="mx-2 my-1 text-warning"
                                                                id={"update-btn" + key}
                                                                onClick={() => toggleAddEdit('edit', task.id)}
                                                            />

                                                            <UncontrolledTooltip placement="top" target={"update-btn" + key}>
                                                                Update
                                                            </UncontrolledTooltip>

                                                            <BsFillTrashFill
                                                                style={{ fontSize: "2rem", cursor: "pointer" }}
                                                                color="danger"
                                                                className="mx-2 my-1 text-danger"
                                                                id={"delete-btn" + key}
                                                                onClick={() => toggleDelete(task.id)}
                                                            />
                                                            <UncontrolledTooltip placement="top" target={"delete-btn" + key}>
                                                                Delete
                                                            </UncontrolledTooltip>
                                                        </>
                                                        :
                                                        <Spinner type="grow" />
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <tr>
                                    <td colSpan={5}>No Tasks</td>
                                </tr>
                            }
                        </>
                        :
                        <tr>
                            <td style={{ verticalAlign: "middle" }} colSpan={5}>
                                <Spinner type="grow" className="me-2" />
                                <Spinner type="grow" className="me-2" />
                                <Spinner type="grow" />
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
            <Row>
                <Col md="2">
                    {/*size per page*/}
                    <Select
                        defaultValue={{ value: 10, label: 10 }}
                        options={[
                            { value: 10, label: 10 },
                            { value: 20, label: 20 },
                            { value: 30, label: 30 },
                            { value: 50, label: 10 }
                        ]}
                        onChange={(e: any) => {
                            onSizePerChange(e.value)
                        }}
                        className="text-center"
                    />
                </Col>
                <Col md="10">
                    {/* Pagination */}
                    <Pagination>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
                        </PaginationItem>

                        {/* Generate pagination links dynamically */}
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i} active={i + 1 === currentPage}>
                                <PaginationLink onClick={() => onPageChange(i + 1)}>{i + 1}</PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
                        </PaginationItem>
                    </Pagination>
                </Col>

            </Row>
        </>
    )
}

export default ReactTable;