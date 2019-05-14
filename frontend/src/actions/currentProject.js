import axios from 'axios';
import { reset } from 'redux-form';
import { ADD_COLUMN, GET_PROJECT, ADD_TASK, UPDATE_COLUMNS, UPDATE_PROJECT } from './types';

const url = "http://localhost:5000/api/projects";

export const getProject = (token, projectId) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(`${url}/${projectId}`, config)
        .then((res) => {
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addNewColumn = (projectId, column, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.post(`${url}/${projectId}`, column, config)
        .then((res) => {
            dispatch({
                type: ADD_COLUMN,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });

    dispatch(reset('add-box'));
}

export const addNewTask = (projectId, columnId, task, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.post(`${url}/${projectId}/${columnId}`, task, config)
        .then((res) => {
            dispatch({
                type: ADD_TASK,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });

    dispatch(reset('add-box'));
}

export const updateColumns = (projectId, columns, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.put(`${url}/${projectId}`, columns, config)
        .then((res) => {
            dispatch({
                type: UPDATE_COLUMNS,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}

export const renameProject = (projectId, name, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.put(`${url}/${projectId}/rename`, name, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}

export const archiveProject = (projectId, token, callback) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.put(`${url}/${projectId}/archive`, {}, config)
        .then((res) => {
            callback();
        })
        .catch((err) => {
             console.log(err);
        });
}

export const updateTask = (projectId, columnId, task, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log(task);

    axios.put(`${url}/${projectId}/${columnId}/${task._id}`, task, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}

export const deleteTask = (projectId, columnId, taskId, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.delete(`${url}/${projectId}/${columnId}/${taskId}`, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}

export const renameColumn = (projectId, columnId, column, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.put(`${url}/${projectId}/${columnId}`, column, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}

export const deleteColumn = (projectId, columnId, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.delete(`${url}/${projectId}/${columnId}`, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
}



