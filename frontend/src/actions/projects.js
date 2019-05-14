import axios from 'axios';
import { GET_PROJECTS, CREATE_PROJECT } from './types';

const url = "http://localhost:5000/api/projects";

export const getProjects = (token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.get(url, config)
        .then((res) => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data.projects
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createNewProject = (project, token) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    axios.post(url, project, config)
        .then((res) => {
            dispatch({
                type: CREATE_PROJECT,
                payload: res.data
            });
        })
        .catch((err) => {
             console.log(err);
        });
};

