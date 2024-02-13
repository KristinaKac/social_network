import { ThunkAction } from "redux-thunk";
import { ResultCodes, followAPI, getUsers, unfollowAPI } from "../api/api";
import { StateType } from "./redux.js";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING = 'IS_FETCHING';
const IS_BTN_IN_PROGRESS = 'IS_BTN_IN_PROGRESS';

const initialValue = {
    users: [] as Array<UsersType>,
    totalPages: 0,
    currentPage: 1,
    maxPortionOnPage: 5,
    portionSize: 10,
    isFetching: false,
    isBtnInProgress: [] as Array<number>,
}
type InitialValueType = typeof initialValue;

const usersReducer = (state = initialValue, action: actionType): InitialValueType => {
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

type actionType = FollowType | UnfollowType | SetUsersType | SetTotalPagesType | SetCurrentPageType | SetFetchingType |
    SetBtnInProgressType;

type FollowType = {
    type: typeof FOLLOW,
    id: number
}
type UnfollowType = {
    type: typeof UNFOLLOW,
    id: number
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
type SetTotalPagesType = {
    type: typeof SET_TOTAL_PAGES,
    pages: number
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}
type SetFetchingType = {
    type: typeof IS_FETCHING,
    fetch: boolean
}
type SetBtnInProgressType = {
    type: typeof IS_BTN_IN_PROGRESS,
    value: boolean,
    id: number
}

export const follow = (id: number): FollowType => ({ type: FOLLOW, id: id })
export const unfollow = (id: number): UnfollowType => ({ type: UNFOLLOW, id: id })
export const setUsers = (users: Array<UsersType>): SetUsersType => ({ type: SET_USERS, users })
export const setTotalPages = (pages: number): SetTotalPagesType => ({ type: SET_TOTAL_PAGES, pages })
export const setCurrentPage = (page: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, page })
export const setFetching = (fetch: boolean): SetFetchingType => ({ type: IS_FETCHING, fetch })
export const setBtnInProgress = (value: boolean, id: number): SetBtnInProgressType => ({ type: IS_BTN_IN_PROGRESS, value, id })


export const getUsersThunk = (currentPage: number, maxUsersOnPage: number): ThunkAction<void, StateType, unknown, actionType> =>
    async (dispatch) => {
        dispatch(setFetching(false));
        const response = await getUsers(currentPage, maxUsersOnPage);
        dispatch(setFetching(true));
        dispatch(setCurrentPage(currentPage));
        dispatch(setTotalPages(response.totalCount));
        dispatch(setUsers(response.items));
    }

export const followThunk = (userId: number): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    dispatch(setBtnInProgress(true, userId));
    const response = await followAPI(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(follow(userId));
    }
    dispatch(setBtnInProgress(false, userId));
}

export const unfollowThunk = (userId: number): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    dispatch(setBtnInProgress(true, userId));
    const response = await unfollowAPI(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(unfollow(userId));
    }
    dispatch(setBtnInProgress(false, userId));
}

export default usersReducer;