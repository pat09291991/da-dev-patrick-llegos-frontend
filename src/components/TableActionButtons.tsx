import React from 'react';
import { FiEdit } from "react-icons/fi";
import { TiUserDelete } from "react-icons/ti";
import { Spinner, UncontrolledTooltip } from "reactstrap";

interface TableActionButtonsProps {
    row: {
        id: number
    };
    buttonDisabled: boolean;
    toggleAddEdit: any;
    toggleDelete: any;
}

const TableActionButtons: React.FC<TableActionButtonsProps> = ({
    row,
    buttonDisabled,
    toggleAddEdit,
    toggleDelete
}) => {

    return (
        <div className="px-2 justify-content-center d-flex" style={{ minWidth: "50px" }}>
            {!buttonDisabled ?
                <>
                    <FiEdit
                        style={{ fontSize: "2rem", cursor: "pointer" }}
                        onClick={() => toggleAddEdit('edit', row.id)}
                        color="warning"
                        className="mx-2 my-1 text-warning"
                        id={"add-edit-btn" + row.id}
                    />
                    <UncontrolledTooltip placement="top" target={"add-edit-btn" + row.id}>
                        Edit Details
                    </UncontrolledTooltip>

                    <TiUserDelete
                        style={{ fontSize: "2rem", cursor: "pointer" }}
                        onClick={() => toggleDelete(row.id)}
                        color="danger"
                        className="mx-2 my-1 text-danger"
                        id={"delete-btn" + row.id}
                    />
                    <UncontrolledTooltip placement="top" target={"delete-btn" + row.id}>
                        Delete Member
                    </UncontrolledTooltip>
                </>
                :
                <Spinner type="grow" />
            }
        </div>
    )
}

export default TableActionButtons;