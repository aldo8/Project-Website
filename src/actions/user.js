import {AccountApi} from 'api'
import {
    FAILURE_TYPE,
    GET_USER_TYPE,
    LOGIN_TYPE,
    // LOGOUT_TYPE,
    REQUEST_TYPE,
    // SET_LEADER_TYPE,
    SUCCESS_TYPE
} from './actionTypes';
import {
    setStorage
} from 'utils/storage.helper';
import {USER_STORAGE} from 'constants/storage';
import { getErrorApiDesc } from 'utils/error.helper';
import {getStorage} from 'utils/storage.helper';

export const getUser = () => dispatch => {
    dispatch({type:`${GET_USER_TYPE}${REQUEST_TYPE}`});
    const user = getStorage(USER_STORAGE);
    if(user) {
        dispatch({
            type:`${GET_USER_TYPE}${SUCCESS_TYPE}`,
            payload:{data:user},
        });
    } else {
        dispatch({
            type:`${GET_USER_TYPE}${FAILURE_TYPE}`,
            payload:{message:null},
        });
    }  
};

export const login = ({username,password}) => dispatch => {
    const api = AccountApi.newInstance();
    dispatch({type:`${LOGIN_TYPE}${REQUEST_TYPE}`});
    api
    .login({username,password})
    .then(res => {
        console.log('Response: ',res);
        setStorage(USER_STORAGE,res.data);
        dispatch({
            type:`${LOGIN_TYPE}${SUCCESS_TYPE}`,
            payload:{
                statusCode:res.status,
                data:res.data,
            },
        });
    })
    .catch(err => {
        console.log('Response: ',err);
        dispatch({
            type:`${LOGIN_TYPE}${FAILURE_TYPE}`,
            payload:{
                statusCode:err.status,
                message:getErrorApiDesc(err),
            },
        });
    })
};