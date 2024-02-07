import { auth, getCaptcha, loginAuth, logout } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialValue = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = initialValue, action) => {
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

export const setUserData = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } });
export const setCaptcha = (url) => ({ type: SET_CAPTCHA, url });

export const authThunk = () => (dispatch) => {
    return auth().then(response => {
        if (response.data.resultCode === 0) {
            const { email, id, login } = response.data.data;
            dispatch(setUserData(email, id, login, true));
        }
    });
}

export const loginThunk = (email, password, rememberMe, captha, setStatus) => {
    return (dispatch) => {
        loginAuth(email, password, rememberMe, captha).then(response => {
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
        });
    }
}

export const logoutThunk = () => {
    return (dispatch) => {
        logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        });
    }
}
export const getCaptchaThunk = () => {
    return (dispatch) => {
        getCaptcha().then(response => {
            dispatch(setCaptcha(response.data.url));
        });
    }
}


export default authReducer;