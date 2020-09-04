import React,{Component} from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {MENU} from 'constants/menu';
import {getStorage} from 'utils/storage.helper';
import {USER_STORAGE} from 'constants/storage'
import { getUser } from 'actions/user';

export default function (ComposedComponent) {
    class AuthGuard extends Component {
        //Component life cycle
        UNSAFE_componentWillMount(){
            this._handleUser()
        }
        UNSAFE_componentWillUpdate() {
            this._handleUser()
        }

        //private function for handling user
        _handleUser = () => {
            const user = getStorage(USER_STORAGE);
            if( !user) {
                this.props.goToLogin();
                return;
            }
            if (!this.props.user.tokenResponse){
                this.props.getUser();
            }
        }
        
        render () {
            return <ComposedComponent {...this.props.component}/>;
        }
    }
    const mapStateToProps = state => ({
        user:state.user
    })
    const mapDispatchToProps = (dispatch) => ({
        goToLogin: () => dispatch(push(MENU.LOGIN)),
        getUser: () => dispatch(getUser())
    });
    return connect(mapStateToProps,mapDispatchToProps)(AuthGuard);
}