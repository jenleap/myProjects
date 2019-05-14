import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Dashboard from './components/Dashboard';
import ProjectBoard from './components/projects/ProjectBoard';

const store = createStore(
    reducers,
    { auth: { authenticated: localStorage.getItem('token') }},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App>
                <Route path='/' exact component={ Welcome } />
                <Route path='/signup' component={ Signup } />
                <Route path='/signout' component={ Signout } />
                <Route path='/signin' component={ Signin } />
                <Route path='/dashboard' component={ Dashboard } />
                <Route path='/project/:projectId' component={ ProjectBoard } />
            </App>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
