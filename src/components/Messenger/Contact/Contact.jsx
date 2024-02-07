import React from 'react';
import css from '../Messenger.module.css';
import { NavLink } from 'react-router-dom';

const Contact = (props) => {
    return (
        <li className={css.contact_item}>
            <NavLink to={"/messenger/" + props.id}>{props.name}</NavLink>
        </li>
    )
}

export default Contact;