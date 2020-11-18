import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import headerReducer from './store/reducers/header';
import mainReducer from './store/reducers/main';
import newpostReducer from './store/reducers/newpost';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';



const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReduser = combineReducers({
    header: headerReducer,
    main: mainReducer,
    newpost: newpostReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReduser, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
