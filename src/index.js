import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import calcReducer from './redux/calcReducer.js';
import calcSaga from './redux/calcSaga';
import App from './App/App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
    [sagaMiddleware, logger] :
    [sagaMiddleware];

const store = createStore(
    calcReducer,
    // adds all middleware to our project including saga and logger
    applyMiddleware(...middlewareList),
);

sagaMiddleware.run(calcSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-root'),
);

serviceWorker.unregister();
