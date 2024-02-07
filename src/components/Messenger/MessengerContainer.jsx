import React from 'react';
import { addMessageCreator, changeTextareaMessageCreator } from '../../state/messengerReducer';
import Messenger from './Messenger';
import { connect } from 'react-redux';
import {WithRedirectComponentToLogin} from '../../hoc/withRedirectComponent';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        messengerPage: state.messengerPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: () => {
            dispatch(addMessageCreator());
        },
        changeTextareaMessage: (text) => {
            dispatch(changeTextareaMessageCreator(text));
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithRedirectComponentToLogin
)(Messenger);