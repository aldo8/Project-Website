import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import {history} from 'config/router.config';
import errorReducer from './error';
import loadingReducer from './loading';
import userReducer from './user';
import displayReducer from './display';
import {workOrderReducer} from './workOrder';
import {assignmentReducer} from './assignment';
import {problemLogReducer} from './problemLog';
import {trackingReducer} from './tracking';
import {periodicInspectionReducer} from './periodicInspection';
import {backlogReducer} from './backlog';


const appReducer = combineReducers({
    router: connectRouter(history),
    error:errorReducer,
    loading:loadingReducer,
    user:userReducer,
    displayMode:displayReducer,
    workOrder:workOrderReducer,
    assignment:assignmentReducer,
    problemLog:problemLogReducer,
    tracking:trackingReducer,
    periodicInspection:periodicInspectionReducer,
    backlog:backlogReducer
});

export default appReducer;
