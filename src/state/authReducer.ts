import { ResultCodeForCaptcha, ResultCodes } from '../api/api';
import { AuthAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { BaseThunkType, InferActionType } from './redux.js';

const initialValue = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}

const authReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
            }
        case 'SET_CAPTCHA':
            return {
                ...state,
                captcha: action.url
            }
        default:
            return state;
    }
}

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', data: { id, email, login, isAuth }
    } as const),
    setCaptcha: (url: string) => ({ type: 'SET_CAPTCHA', url } as const),
}

export const authThunk = (): ThunkType => async (dispatch) => {
    const response = await AuthAPI.auth();
    if (response.resultCode === ResultCodes.Success) {
        const { id, email, login } = response.data;
        dispatch(actions.setUserData(id, email, login, true));
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captha: string | null, setStatus: any):
    ThunkType => async (dispatch) => {
        const response = await AuthAPI.loginAuth(email, password, rememberMe, captha);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(authThunk());
        } else {
            if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaThunk());
            } else {
                let messages = response.messages.length > 0 ? response.messages[0] : 'Some error';
                setStatus({ messages });
            }
        }
    }

export const logoutThunk = (): ThunkType => async (dispatch) => {
    const response = await AuthAPI.logout();
    if (response.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}
export const getCaptchaThunk = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    dispatch(actions.setCaptcha(response.url));
}
export default authReducer;

type InitialValueType = typeof initialValue;
type ActionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;