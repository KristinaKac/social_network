import avatar from '../img/avatar.png';
import { getStatus, getUser, setPhoto, setProfileSettings, updateStatus } from '../api/api'

const ADD_POST = 'ADD_POST';
const CHANGE_TEXTAREA_POST = 'CHANGE_TEXTAREA_POST';
const SET_USER = 'SET_USER';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';
const SET_SUCCESS_EDIT = 'SET_SUCCESS_EDIT';


const initialValue = {
    posts: [
        { id: 1, avatar: avatar, text: 'hi' },
        { id: 2, avatar: avatar, text: 'My name is Kristina' },
    ],
    textAreaNewPost: '',
    currentUser: null,
    currentStatus: '',
    isSuccessEdit: false
}

const profileReducer = (state = initialValue, action) => {

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5,
                avatar: avatar,
                text: state.textAreaNewPost
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case CHANGE_TEXTAREA_POST:
            return {
                ...state,
                textAreaNewPost: action.text
            }
        case SET_USER:
            return {
                ...state,
                currentUser: action.user
            }
        case SET_STATUS:
            return {
                ...state,
                currentStatus: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                currentUser: { ...state.currentUser, photos: action.photos }
            }
        case SET_SUCCESS_EDIT:
            return {
                ...state,
                isSuccessEdit: action.success
            }
        default:
            return state;
    }
}
export const addPost = () => ({ type: ADD_POST });
export const changeTextareaPost = (text) => ({ type: CHANGE_TEXTAREA_POST, text: text });
export const setUser = (user) => ({ type: SET_USER, user });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setPhotoProfile = (photos) => ({ type: SET_PHOTO, photos });
export const setEdit = (success) => ({ type: SET_SUCCESS_EDIT, success });

export const getUserThunk = (userId) => {
    return (dispatch) => {
        getUser(userId).then(response => {
            dispatch(setUser(response.data));
        });
    }
}

export const getStatusThunk = (userId) => {
    return (dispatch) => {
        getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        });
    }
}

export const updateStatusThunk = (status) => {
    return (dispatch) => {
        updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export const setPhotoThunk = (file) => {
    return (dispatch) => {
        setPhoto(file).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setPhotoProfile(response.data.data.photos));
            }
        });
    }
}
export const setProfileSettingsThunk = (profile, setStatus) => async (dispatch) => {
    const response = await setProfileSettings(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserThunk(profile.userId));
        dispatch(setEdit(true));
    } else {
        if(response.data.messages.length > 0){
            dispatch(setEdit(false));
            setStatus({message: response.data.messages[0]});
        }
    }
}

export default profileReducer;