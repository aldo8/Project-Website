import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from 'reducers';
import {history} from './router.config';

function storeConfig(state){
    const composeEnhancer = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        appReducer,
        state,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
                thunk, 
                logger
                ),
            ),
        );
        return store;
}

export default storeConfig;