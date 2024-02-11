import avatar from '../img/avatar.png';
import { getStatus, getUser, setPhoto, setProfileSettings, updateStatus } from '../api/api.js'
import { ThunkAction } from 'redux-thunk';
import { StateType } from './redux';

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
    ] as Array<PostType>,
    textAreaNewPost: '',
    currentUser: null as ProfileUserType | null,
    currentStatus: '',
    isSuccessEdit: false,
}

type InitialValueType = typeof initialValue;

const profileReducer = (state = initialValue, action: actionType): InitialValueType => {

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
                currentUser: { ...state.currentUser, photos: action.photos } as ProfileUserType
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
type AddPostType = {
    type: typeof ADD_POST
}
type ChangeTextareaPostType = {
    type: typeof CHANGE_TEXTAREA_POST,
    text: string
}
type SetUserType = {
    type: typeof SET_USER,
    user: ProfileUserType
}
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type SetPhotoProfileType = {
    type: typeof SET_PHOTO,
    photos: PhotosType
}
type SetEditType = {
    type: typeof SET_SUCCESS_EDIT,
    success: boolean
}

type actionType = AddPostType | ChangeTextareaPostType | SetUserType | SetStatusType | SetPhotoProfileType | SetEditType;

export const addPost = (): AddPostType => ({ type: ADD_POST });
export const changeTextareaPost = (text: string): ChangeTextareaPostType => ({ type: CHANGE_TEXTAREA_POST, text: text });
export const setUser = (user: ProfileUserType): SetUserType => ({ type: SET_USER, user });
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status });
export const setPhotoProfile = (photos: PhotosType): SetPhotoProfileType => ({ type: SET_PHOTO, photos });
export const setEdit = (success: boolean): SetEditType => ({ type: SET_SUCCESS_EDIT, success });

export const getUserThunk = (userId: number): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await getUser(userId);
    dispatch(setUser(response.data));
}

export const getStatusThunk = (userId: number): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatusThunk = (status: string): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const setPhotoThunk = (file: File): ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
    const response = await setPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhotoProfile(response.data.data.photos));
    }
}
export const setProfileSettingsThunk = (profile: ProfileUserType, setStatus: any):
    ThunkAction<void, StateType, unknown, actionType> => async (dispatch) => {
        const response = await setProfileSettings(profile);
        if (response.data.resultCode === 0) {
            // if (!profile.userId) return;
            dispatch(getUserThunk(profile.userId));
            dispatch(setEdit(true));
        } else {
            if (response.data.messages.length > 0) {
                dispatch(setEdit(false));
                setStatus({ message: response.data.messages[0] });
            }
        }
    }

export default profileReducer;