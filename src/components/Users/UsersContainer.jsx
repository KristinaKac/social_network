import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
    follow, unfollow, getUsersThunk, followThunk, unfollowThunk
} from "../../state/usersReducer";
import Users from "./Users";
import Preloader from '../common/Preloader';

const UsersContainer = (props) => {
    useEffect(() => {
        props.getUsersThunk(props.currentPage, props.maxPortionOnPage);
    }, [props.currentPage, props.maxPortionOnPage]);

    const onClickChangePage = (page) => {
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
                usersPage={props.usersPage}
                isBtnInProgress={props.isBtnInProgress}
                followThunk={props.followThunk}
                unfollowThunk={props.unfollowThunk}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usersPage: state.usersPage,
        currentPage: state.usersPage.currentPage,
        maxPortionOnPage: state.usersPage.maxPortionOnPage,
        totalPages: state.usersPage.totalPages,
        portionSize: state.usersPage.portionSize,
        isFetching: state.usersPage.isFetching,
        isBtnInProgress: state.usersPage.isBtnInProgress
    }
}

export default connect(mapStateToProps,
    {
        follow, unfollow, getUsersThunk, followThunk, unfollowThunk
    })(UsersContainer);



