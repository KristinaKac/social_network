import React from 'react';
import { useSelector } from "react-redux";
import Users from "../components/Users/Users";
import Preloader from '../components/common/preloader/Preloader';
import { StateType } from '../state/redux';



const UsersPage = () => {

    const isFetching = useSelector((state: StateType) => state.usersPage.isFetching);

    return (
        <div>
            {
                !isFetching ?
                    <Preloader /> : null
            }
            <Users />
        </div>
    )
}
export default UsersPage;



