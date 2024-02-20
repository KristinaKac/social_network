import React, { useEffect, useRef, useState, UIEvent } from "react";
import { useDispatch } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../state/chatReducer";
import { AppDispatch, useTypedSelector } from "../state/redux";
import css from './ChatPage.module.css';
import cn from 'classnames';
import iconMessage from '../img/send_chat.png';

const ChatPage = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export default ChatPage;


const Chat = () => {

    const dispatch: AppDispatch = useDispatch();
    const status = useTypedSelector((state) => state.chatPage.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);

    return (
        <React.Fragment>
            {status === 'error' && <div>Some error. Please, restart page.</div>}

            <Messages />
            <MessageForm />

        </React.Fragment>
    )
}

const MessageForm = () => {

    const dispatch: AppDispatch = useDispatch();
    const status = useTypedSelector((state) => state.chatPage.status);


    const [message, setMessage] = useState('');

    const sendMessageHandler = () => {
        if (!message) return;

        dispatch(sendMessage(message));
        setMessage('');
    }

    return (
        <div className={css.form_wrapper}>
            <div className={css.form_message}>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} placeholder="Введите сообщение..."></textarea>
                <button className={css.send_msg_btn} disabled={status !== 'ready'} onClick={sendMessageHandler}>
                    <img src={iconMessage} alt="send" />
                </button>
            </div>
        </div>
    )
}

const Messages = () => {

    const messages = useTypedSelector((state) => state.chatPage.messages);
    const messageAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (isAutoScroll) {
            setTimeout(() => {
                messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, [messages]);

    const scrollHandler = (event: UIEvent<HTMLUListElement>) => {
        const element = event.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    return (
        <ul className={css.messages_block} onScroll={scrollHandler} >
            {messages.map((message) => <Message key={message.id} message={message} />)}
            <div ref={messageAnchorRef}></div>
        </ul>
    )
}

const Message: React.FC<{ message: ChatMessagesType }> = React.memo(({ message }) => {
    const authUserId = useTypedSelector((state) => state.auth.id);

    return (
        <React.Fragment>
            {message.userId === authUserId
                ?
                <li className={cn(css.message_wrapper, css.auth_user_message)}>
                    <div className={css.message}>
                        <div className={css.message_user_name}>{message.userName}</div>
                        <div className={css.message_user_message}>{message.message}</div>
                    </div>
                    <div className={css.message_photo}>
                        <img src={message.photo} alt="" />
                    </div>
                </li>
                :
                <li className={cn(css.message_wrapper, css.other_user_message)}>
                    <div className={css.message_photo}>
                        <img src={message.photo} alt="" />
                    </div>
                    <div className={css.message}>
                        <div className={css.message_user_name}>{message.userName}</div>
                        <div className={css.message_user_message}>{message.message}</div>
                    </div>
                </li>
            }
        </React.Fragment >
    )
})