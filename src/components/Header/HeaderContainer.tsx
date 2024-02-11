import React, { FC } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutThunk } from '../../state/authReducer';
import { StateType } from '../../state/redux';

type MapStateType = {
    isAuth: boolean,
    login: string | null,
}
type OwnPropsType = {}

type MapDispatchType = {
    logoutThunk: () => void
}
type PropsType = MapStateType & MapDispatchType & OwnPropsType;

const HeaderContainer: FC<PropsType> = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logoutThunk={props.logoutThunk} />
    )
}

const mapStateToProps = (state: StateType): MapStateType => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect<MapStateType, MapDispatchType, OwnPropsType, StateType>
    (mapStateToProps, { logoutThunk })(HeaderContainer);