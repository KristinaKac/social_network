import React, { FC } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutThunk } from '../../state/authReducer';
import { StateType } from '../../state/redux';


const HeaderPage = () => {
    return (
        <Header />
    )
}
export default HeaderPage;