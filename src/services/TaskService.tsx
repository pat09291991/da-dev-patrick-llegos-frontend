import { TASKS } from '../constants/api';
import { notifyError, notifySuccess } from '../components/Toaster';
import axios from 'axios';

export const TaskService = () => {
    let ENDPOINT = TASKS;

    async function getTasks(
        setData: any,
        setPageCount: any,
        page: any,
        sizePerPageQuery: any,
        setLoading: any,
        filters: any,
    ) {
        let q = filters.searchText.trim();
        let filter = `?q=${q}&sizePerPage=${sizePerPageQuery}&page=${page}&status=${filters.status}`;
        try {
            let res = await axios.get(ENDPOINT + filter);

            setData(res.data.data);
            setPageCount(Math.ceil(res.data.total / sizePerPageQuery));
            if (setLoading) setLoading(false);
        } catch (err: any) {
            if (err.response) {
                if (err.response.data.error) {
                    notifyError(err.response.data.error);
                } else {
                    notifyError('Error while fetching audit logs');
                }
            } else {
                notifyError('Error while fetching audit logs');
            }
        }
    }

    async function postTask(data: object, setButtonDisabled: any, setUpdateTable: any, updateTable: any, setOpenAddEditModal: any) {
        try {
            let res = await axios.post(ENDPOINT, data);

            notifySuccess(res.data)
            setUpdateTable(!updateTable)
            setOpenAddEditModal(false)
        } catch (err: any) {
            if (err.response) {
                if (err.response.data?.error) {
                    notifyError(err.response.data.error);
                } else {
                    notifyError('Error while adding new task');
                }
            } else {
                notifyError('Error while adding new task');
            }
        }
        setButtonDisabled(false)
    }

    async function getTask(id: number, setTask: any, setOpenAddEditModal: any, setButtonDisabled: any) {
        try {
            let res = await axios.get(ENDPOINT + `/${id}`);

            setTask(res.data)
            setOpenAddEditModal(true)
        } catch (err: any) {
            if (err.response) {
                if (err.response.data?.error) {
                    notifyError(err.response.data.error);
                } else {
                    notifyError('Error while fetching task');
                }
            } else {
                notifyError('Error while fetching task');
            }
        }
        setButtonDisabled(false)
    }

    async function putTask(id: number, taskData: any, setButtonDisabled: any, setUpdateTable: any, updateTable: boolean, setOpenAddEditModal: any) {
        try {
            let res = await axios.put(ENDPOINT + `/${id}`, taskData);

            notifySuccess(res.data)
            setUpdateTable(!updateTable)
            setOpenAddEditModal(false)
        } catch (err: any) {
            if (err.response) {
                if (err.response.data?.error) {
                    notifyError(err.response.data.error);
                } else {
                    notifyError('Error while updating task');
                }
            } else {
                notifyError('Error while updating task');
            }
        }
        setButtonDisabled(false)
    }

    async function deleteTask(id: number, setButtonDisabled: any, setUpdateTable: any, updateTable: any) {
        try {
            let res = await axios.delete(ENDPOINT + `/${id}`);

            notifySuccess(res.data)
            setUpdateTable(!updateTable)
        } catch (err: any) {
            if (err.response) {
                if (err.response.data?.error) {
                    notifyError(err.response.data.error);
                } else {
                    notifyError('Error while deleting task');
                }
            } else {
                notifyError('Error while deleting task');
            }
        }
        setButtonDisabled(false)
    }

    return {
        getTasks,
        postTask,
        getTask,
        putTask,
        deleteTask,
    };
};