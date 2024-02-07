import { auth, loginAuth, logout } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialValue = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialValue, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const setUserData = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } });

export const authThunk = () => (dispatch) => {
    return auth().then(response => {
        if (response.data.resultCode === 0) {
            const { email, id, login } = response.data.data;
            dispatch(setUserData(email, id, login, true));
        }
    });
}

export const loginThunk = (email, password, rememberMe, setStatus) => {
    return (dispatch) => {
        loginAuth(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authThunk());
            } else {
                let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                setStatus({ messages });
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

export default authReducer;