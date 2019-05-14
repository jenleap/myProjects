import { GET_PROJECT, ADD_COLUMN, ADD_TASK, UPDATE_COLUMNS, UPDATE_PROJECT } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_PROJECT:
            console.log(action.payload);
            return action.payload;
        case ADD_COLUMN:
            return action.payload;
        case ADD_TASK:
            return action.payload;
        case UPDATE_COLUMNS:
            return action.payload;
        case UPDATE_PROJECT:
            return action.payload;
        default:
            return state;
    }
};