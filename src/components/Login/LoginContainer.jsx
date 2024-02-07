import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { loginThunk } from '../../state/authReducer';
import { compose } from 'redux';
import {WithRedirectComponentToProfile} from '../../hoc/withRedirectComponent';


const LoginContainer = (props) => {

    return (
        <Login loginThunk={props.loginThunk} captcha={props.captcha} />
    )
}
const mapStateToProps = (state) => {
    return {
        captcha: state.auth.captcha
    }
}

export default compose(
    connect(mapStateToProps, { loginThunk }),
    WithRedirectComponentToProfile,
)(LoginContainer)

