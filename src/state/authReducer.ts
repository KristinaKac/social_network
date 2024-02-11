import { ThunkAction } from 'redux-thunk';
import { auth, getCaptcha, loginAuth, logout } from '../api/api';
import { StateType } from './redux.js';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialValue = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}
type InitialValueType = typeof initialValue;


const authReducer = (state = initialValue, action: actionType): InitialValueType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.url
            }
        default:
            return state;
    }
}
type LoginUserDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type UserDataType = {
    type: typeof SET_USER_DATA,
    data: LoginUserDataType
}
type CaptchaType = {
    type: typeof SET_CAPTCHA,
    url: string
}

type actionType = UserDataType | CaptchaType;

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): UserDataType => ({
    type: SET_USER_DATA, data: { id, email, login, isAuth }
});

export const setCaptcha = (url: string): CaptchaType => ({ type: SET_CAPTCHA, url });

export const authThunk = (): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await auth();
    if (response.data.resultCode === 0) {
        const { id, email, login } = response.data.data;
        dispatch(setUserData(id, email, login, true));
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captha: string | null, setStatus: any):
    ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
        const response = await loginAuth(email, password, rememberMe, captha);
        if (response.data.resultCode === 0) {
            dispatch(authThunk());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaThunk());
            } else {
                let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                setStatus({ messages });
            }
        }
    }

export const logoutThunk = (): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}
export const getCaptchaThunk = (): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await getCaptcha();
    dispatch(setCaptcha(response.data.url));
}


export default authReducer;