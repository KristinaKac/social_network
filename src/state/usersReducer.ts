import { usersAPI } from "../api/users-api";
import { ResultCodes } from "../api/api";
import { BaseThunkType, InferActionType } from "./redux.js";

const initialValue = {
    users: [] as Array<UsersType>,
    totalPages: 0,
    currentPage: 1,
    maxPortionOnPage: 15,
    portionSize: 10,
    isFetching: false,
    isBtnInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as boolean | null
    }
}
type InitialValueType = typeof initialValue;

const usersReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return { ...user, followed: true }
                    }

                    return user;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return { ...user, followed: false }
                    }

                    return user;
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.pages,
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page,
            }
        case 'IS_FETCHING':
            return {
                ...state,
                isFetching: action.fetch,
            }
        case 'IS_BTN_IN_PROGRESS':
            return {
                ...state,
                isBtnInProgress: action.value
                    ? [...state.isBtnInProgress, action.id]
                    : state.isBtnInProgress.filter(id => id !== action.id)

            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}

export const actions = {
    follow: (id: number) => ({ type: 'FOLLOW', id: id } as const),
    unfollow: (id: number) => ({ type: 'UNFOLLOW', id: id } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setTotalPages: (pages: number) => ({ type: 'SET_TOTAL_PAGES', pages } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setFetching: (fetch: boolean) => ({ type: 'IS_FETCHING', fetch } as const),
    setBtnInProgress: (value: boolean, id: number) => ({ type: 'IS_BTN_IN_PROGRESS', value, id } as const),
    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', filter } as const),
}
type ActionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;


export const getUsersThunk = (currentPage: number, maxUsersOnPage: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setFetching(false));
        const response = await usersAPI.getUsers(currentPage, maxUsersOnPage, filter);
        dispatch(actions.setFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        dispatch(actions.setTotalPages(response.totalCount));
        dispatch(actions.setUsers(response.items));
    }

export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setBtnInProgress(true, userId));
    const response = await usersAPI.followAPI(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(actions.follow(userId));
    }
    dispatch(actions.setBtnInProgress(false, userId));
}

export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setBtnInProgress(true, userId));
    const response = await usersAPI.unfollowAPI(userId);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(actions.unfollow(userId));
    }
    dispatch(actions.setBtnInProgress(false, userId));
}

export default usersReducer;