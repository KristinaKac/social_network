import React, { FC } from 'react';
import css from './Messenger.module.css';
import Contact from './Contact/Contact';
import Dialog from './Dialog/Dialog';

type PropsType = {
    contacts: Array<ContactsType>,
    dialogs: Array<DialogsType>,
    textAreaNewMessage: string,
    addMessage: () => void,
    changeTextareaMessage: (text: string) => void
}

const Messenger: FC<PropsType> = (props) => {

    let contactsElements = props.contacts.map(contact => <Contact key={contact.id} id={contact.id} name={contact.name} />);
    let dialogsElements = props.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} message={dialog.message} />);

    const addMessage = () => {
        props.addMessage();
    }
    const changeTextareaMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
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
                    <textarea value={props.textAreaNewMessage} onChange={changeTextareaMessage}></textarea>
                    <button type="button" onClick={addMessage}>send message</button>
                </div>

            </div>
        </div>
    )
}

export default Messenger;