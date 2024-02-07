import { followAPI, getUsers, unfollowAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING = 'IS_FETCHING';
const IS_BTN_IN_PROGRESS = 'IS_BTN_IN_PROGRESS';


const initialValue = {
    users: [],
    totalPages: 0,
    currentPage: 1,
    maxPortionOnPage: 5,
    portionSize: 10,
    isFetching: false,
    isBtnInProgress: [],
}

const usersReducer = (state = initialValue, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return { ...user, followed: true }
                    }

                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return { ...user, followed: false }
                    }

                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.pages,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.fetch,
            }
        case IS_BTN_IN_PROGRESS:
            return {
                ...state,
                isBtnInProgress: action.value
                    ? [...state.isBtnInProgress, action.id]
                    : state.isBtnInProgress.filter(id => id !== action.id)

            }
        default:
            return state;
    }
}

export const follow = (id) => ({ type: FOLLOW, id: id })
export const unfollow = (id) => ({ type: UNFOLLOW, id: id })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setTotalPages = (pages) => ({ type: SET_TOTAL_PAGES, pages })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const setFetching = (fetch) => ({ type: IS_FETCHING, fetch })
export const setBtnInProgress = (value, id) => ({ type: IS_BTN_IN_PROGRESS, value, id })


export const getUsersThunk = (currentPage, maxUsersOnPage) => {
    return (dispatch) => {
        dispatch(setFetching(false));
        getUsers(currentPage, maxUsersOnPage).then(response => {
            dispatch(setFetching(true));
            dispatch(setCurrentPage(currentPage));
            dispatch(setTotalPages(response.data.totalCount));
            dispatch(setUsers(response.data.items));
        })
    }
}

export const followThunk = (userId) => {
    return (dispatch) => {

        dispatch(setBtnInProgress(true, userId));
        followAPI(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(follow(userId));
            }
            dispatch(setBtnInProgress(false, userId));
        });
    }
}

export const unfollowThunk = (userId) => {
    return (dispatch) => {
        dispatch(setBtnInProgress(true, userId));

        unfollowAPI(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollow(userId))
            }
            dispatch(setBtnInProgress(false, userId));
        });
    }
}

export default usersReducer;