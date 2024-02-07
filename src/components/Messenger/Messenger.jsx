import React from 'react';
import css from './Messenger.module.css';
import Contact from './Contact/Contact';
import Dialog from './Dialog/Dialog';

const Messenger = (props) => {

    let contactsElements = props.messengerPage.contacts.map(contact => <Contact id={contact.id} name={contact.name} />);
    let dialogsElements = props.messengerPage.dialogs.map(dialog => <Dialog id={dialog.id} message={dialog.message} />);

    const message = React.createRef();

    const addMessage = () => {
        props.addNewMessage();
    }
    const changeTextareaMessage = () => {
        const text = message.current.value;
        props.changeTextareaMessage(text)
    }

    return (
        <div className={css.messenger_wrapper}>
            <div className={css.messenger}>

                <ul className={css.contact_list}>
                    {contactsElements}
                </ul>


                <ul className={css.message_list}>
                    {dialogsElements}
                </ul>

                <div>
                    <textarea value={props.messengerPage.textAreaNewMessage} ref={message} onChange={changeTextareaMessage}></textarea>
                    <button type="button" onClick={addMessage}>send message</button>
                </div>

            </div>
        </div>
    )
}

export default Messenger;