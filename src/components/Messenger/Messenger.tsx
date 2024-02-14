import React, { FC, useState } from 'react';
import css from './Messenger.module.css';
import Contact from './Contact/Contact';
import Dialog from './Dialog/Dialog';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../state/messengerReducer';
import { WithRedirectComponentToLogin } from '../../hoc/withRedirectComponent';

const Messenger = () => {

    const [msg, setMsg] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const contacts = useTypedSelector((state) => state.messengerPage.contacts);
    const dialogs = useTypedSelector((state) => state.messengerPage.dialogs);

    const sendMessage = () => {
        dispatch(actions.sendMessage(msg));
    }
    const changeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setMsg(text);
    }

    return (
        <div className={css.messenger_wrapper}>
            <div className={css.messenger}>

                <ul className={css.contact_list}>
                    {contacts.map(contact => <Contact key={contact.id} id={contact.id} name={contact.name} />)}

                </ul>


                <ul className={css.message_list}>
                    {dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} message={dialog.message} />)}

                </ul>

                <div>
                    <textarea value={msg} onChange={changeTextarea}></textarea>
                    <button type="button" onClick={sendMessage}>send message</button>
                </div>

            </div>
        </div>
    )
}

export default WithRedirectComponentToLogin(Messenger);