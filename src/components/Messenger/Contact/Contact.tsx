import React, { FC } from 'react';
import css from '../Messenger.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number,
    name: string
}

const Contact: FC<PropsType> = ({id, name}) => {
    return (
        <li key={id} className={css.contact_item}>
            <NavLink to={"/messenger/" + id}>{name}</NavLink>
        </li>
    )
}

export default Contact;