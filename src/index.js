import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import headerReducer from './store/reducers/header';
import mainReducer from './store/reducers/main';
import newpostReducer from './store/reducers/newpost';
import authReducer from './store/reducers/auth';
import { watchAuth } from './store/sagas/index';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ParallaxProvider } from 'react-scroll-parallax';
// import { auth } from './store/actions';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReduser = combineReducers({
    header: headerReducer,
    main: mainReducer,
    newpost: newpostReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReduser, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));
sagaMiddleware.run(watchAuth);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ParallaxProvider>
                <App />
            </ParallaxProvider>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
