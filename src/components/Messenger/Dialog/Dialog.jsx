import React from 'react';
import css from '../Messenger.module.css';

const Dialog = (props) => {
    return (
        <li className={css.message_item}>
            {props.message}
        </li>
    )
}

export default Dialog;