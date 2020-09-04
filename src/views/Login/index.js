import Login from './Login';
import {connect} from 'react-redux';
import {LOGIN_TYPE} from 'actions/actionTypes';
import {login} from 'actions/user';
import { push } from 'connected-react-router';
import {
    createLoadingSelector,
    createErrorMessageSelector
} from 'utils/selector.helper'

//Set selector loading 
const loadingSelector = createLoadingSelector([LOGIN_TYPE]);
const errorSelector = createErrorMessageSelector([LOGIN_TYPE]);
const mapStateToProps = state => ({
    ...state.user,
    isLoading:loadingSelector(state),
    errorDesc:errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
    login:({username,password}) => dispatch(login({username,password})),
    push:(url) => dispatch(push(url)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);