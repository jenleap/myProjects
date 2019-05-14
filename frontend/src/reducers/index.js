import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import projects from './projects';
import currentProject from './currentProject';

export default combineReducers({
    auth,
    projects,
    currentProject,
    form: formReducer
});