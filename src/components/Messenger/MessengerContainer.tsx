import React, { FC } from 'react';
import { addMessage, changeTextareaMessage } from '../../state/messengerReducer';
import Messenger from './Messenger';
import { connect } from 'react-redux';
import { WithRedirectComponentToLogin } from '../../hoc/withRedirectComponent';
import { compose } from 'redux';
import { StateType } from '../../state/redux';

type MapStatePropsType = {
    contacts: Array<ContactsType>,
    dialogs: Array<DialogsType>,
    textAreaNewMessage: string,
}
type MapDispatchPropsType = {
    addMessage: () => void,
    changeTextareaMessage: (text: string) => void
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const MessengerContainer: FC<PropsType> = (props) => {
    return (
        <Messenger
            contacts={props.contacts}
            dialogs={props.dialogs}
            textAreaNewMessage={props.textAreaNewMessage}
            addMessage={props.addMessage}
            changeTextareaMessage={props.changeTextareaMessage} />
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        contacts: state.messengerPage.contacts,
        dialogs: state.messengerPage.dialogs,
        textAreaNewMessage: state.messengerPage.textAreaNewMessage,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>
        (mapStateToProps, { addMessage, changeTextareaMessage }),
    WithRedirectComponentToLogin
)(MessengerContainer);