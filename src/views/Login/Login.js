import PropTypes from "prop-types";
import React from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';
import * as Yup from "yup";
import "./Login.scss";
import {
  MovingAsOneLogo,
  UTLogo,
  ArrowRight,
  LoginBg
} from "assets/images";
import {MENU} from 'constants/menu'
import {getStorage} from 'utils/storage.helper';
import {USER_STORAGE} from 'constants/storage'

class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false
    };
  }
  //Validation Schema
  validationSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string()
  });

  //Handling Method
  _handleSubmit = values => {
    this.props.login(values);
  };

  //Component life cycle for login request
  componentDidUpdate () {
    const {errorDesc,isLoading,push,tokenResponse} = this.props;
    if (!errorDesc && !isLoading && tokenResponse) {
      push(MENU.DASHBOARD)
    };
  }

  UNSAFE_componentWillMount () {
    if(getStorage(USER_STORAGE)){
      this.props.push(MENU.DASHBOARD)
    }
  }
  _handleKeyPress = (event,props) => {
    if(event.key === 'Enter') return this._handleSubmit(props)
  }
  //Render form login
  renderForm() {
    console.log('LOGIN',this.props)
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={this.validationSchema}
        onSubmit={this._handleSubmit}
      >
        {({ values,handleChange, handleSubmit }) => (
          <form noValidate autoComplete="off" className="login-form">
            <label htmlFor="username" className="username-label">
            {/* Translate Text */}
              USERNAME
            </label>
            <TextField
              id="username"
              type="text"
              value={values.username}
              onChange={handleChange("username")}
              placeholder="Input your username"
              classes={{ input: "username-input-text" }}
              className="username-input"

            />
            <label htmlFor="password" className="password-label">
            {/* Translate Text */}
              PASSWORD
            </label>
            <TextField
              id="password"
              type={this.state.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              placeholder="Input your password"
              classes={{ input: "username-input-text" }}
              className="password-input"
              onKeyPress={(event) => this._handleKeyPress(event,values)}
            />
            { this.state.showPassword ? 
                    <Visibility 
                        className='visibility-icon'
                        onClick={() => this.setState((prevState) => ({showPassword: !prevState.showPassword}))}
                    />
                    :
                    <VisibilityOff 
                        className='visibility-icon'
                        onClick={() => this.setState((prevState) => ({showPassword: !prevState.showPassword}))}
                    />
                    }
            <Button
              disabled={values.password === '' || values.username === ''}
              variant="contained"
              className="btn-login"
              onClick={handleSubmit}
            >
              LOG IN &nbsp; &nbsp;
              <img alt="arrow" className="arrow-icon" src={ArrowRight} />
            </Button>
          </form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <>
        <div className="login-page">
          <div className="left-pane">
            <img className="login-bg" alt="login-background" src={LoginBg} />
            <img className="logo-ut" alt="logo-ut" src={UTLogo} />
            <div className="app-title">
            {/* Translate Text */}
              <p className="appname1">DATA CAPTURE</p>
              <p className="appname2">APPLICATION</p>
            </div>
          </div>
          <div className="right-pane">
            <img className="movingasone" alt="logo" src={MovingAsOneLogo} />
            <div className="login-form-container">
              <div className="login-form-inner">
              {/* Translate Text */}
                <h2 className="login-title">LOG IN</h2>
                {this.renderForm()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
Login.propTypes = {
  errorDesc: PropTypes.string,
  isLoading: PropTypes.bool,
  login: PropTypes.func,
  tokenResponse: PropTypes.object
};
Login.defaultProps = {
  errorDesc: null,
  isLoading: false,
  login: null,
  tokenResponse: null
};
export default Login;
