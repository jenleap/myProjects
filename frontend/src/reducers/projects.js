import { GET_PROJECTS, CREATE_PROJECT } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case GET_PROJECTS:
            console.log(action.payload)
            return action.payload;
        case CREATE_PROJECT:
            return [
                ...state,
                action.payload
            ]
        default:
            return state;
    }
};