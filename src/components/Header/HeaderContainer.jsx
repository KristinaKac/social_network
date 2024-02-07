import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutThunk } from '../../state/authReducer';

const HeaderContainer = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logoutThunk={props.logoutThunk} />
    )
}

const mapStateToProps = (state) => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { logoutThunk })(HeaderContainer);