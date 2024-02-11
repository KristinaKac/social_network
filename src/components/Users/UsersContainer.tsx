import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
    getUsersThunk, followThunk, unfollowThunk
} from "../../state/usersReducer";
import Users from "./Users";
import Preloader from '../common/preloader/Preloader';
import { StateType } from '../../state/redux';

type MapStateType = {
    totalPages: number,
    maxPortionOnPage: number,
    currentPage: number,
    portionSize: number,
    users: Array<UsersType>,
    isBtnInProgress: Array<number>,
    isFetching: boolean,
}
type MapDispatchType = {
    unfollowThunk: (id: number) => void,
    followThunk: (id: number) => void,
    getUsersThunk: (currentPage: number, maxUsersOnPage: number) => void
}
type OwnPropsType = {
    onClickChangePage: (page: number) => void,
}
type PropsType = MapStateType & MapDispatchType & OwnPropsType;


const UsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsersThunk(props.currentPage, props.maxPortionOnPage);
    }, [props.currentPage, props.maxPortionOnPage]);

    const onClickChangePage = (page: number) => {
        props.getUsersThunk(page, props.maxPortionOnPage);
    }

    return (
        <div>
            {
                !props.isFetching ?
                    <Preloader /> : null
            }
            <Users
                totalPages={props.totalPages}
                maxPortionOnPage={props.maxPortionOnPage}
                currentPage={props.currentPage}
                portionSize={props.portionSize}
                onClickChangePage={onClickChangePage}
                users={props.users}
                isBtnInProgress={props.isBtnInProgress}
                followThunk={props.followThunk}
                unfollowThunk={props.unfollowThunk}
            />
        </div>
    )
}

const mapStateToProps = (state: StateType): MapStateType => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        maxPortionOnPage: state.usersPage.maxPortionOnPage,
        totalPages: state.usersPage.totalPages,
        portionSize: state.usersPage.portionSize,
        isFetching: state.usersPage.isFetching,
        isBtnInProgress: state.usersPage.isBtnInProgress
    }
}

export default connect<MapStateType, MapDispatchType, OwnPropsType, StateType>(mapStateToProps, {
    getUsersThunk, followThunk, unfollowThunk
})(UsersContainer);



