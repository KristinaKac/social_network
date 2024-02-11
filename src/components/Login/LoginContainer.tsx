import React, { FC } from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { loginThunk } from '../../state/authReducer';
import { compose } from 'redux';
import { WithRedirectComponentToProfile } from '../../hoc/withRedirectComponent';
import { StateType } from '../../state/redux';

type MapStateType = {
    captcha: string | null,
}
type OwnPropsType = {}

type MapDispatchType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any) => void
}
type PropsType = MapStateType & MapDispatchType & OwnPropsType;


const LoginContainer: FC<PropsType> = ({loginThunk, captcha}) => {

    return (
        <Login loginThunk={loginThunk} captcha={captcha} />
    )
}
const mapStateToProps = (state: StateType): MapStateType => {
    return {
        captcha: state.auth.captcha
    }
}

export default compose<React.ComponentType>(
    connect<MapStateType, MapDispatchType, OwnPropsType, StateType>(mapStateToProps, { loginThunk }),
    WithRedirectComponentToProfile,
)(LoginContainer)
