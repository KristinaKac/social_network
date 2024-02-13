import { profileAPI } from './../api/profile-api';
import avatar from '../img/avatar.png';
import { ResultCodes } from '../api/api'
import { BaseThunkType, InferActionType } from './redux';

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
        case 'ADD_POST':
            const newPost = {
                id: 5,
                avatar: avatar,
                text: state.textAreaNewPost
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case 'CHANGE_TEXTAREA_POST':
            return {
                ...state,
                textAreaNewPost: action.text
            }
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.user
            }
        case 'SET_STATUS':
            return {
                ...state,
                currentStatus: action.status
            }
        case 'SET_PHOTO':
            return {
                ...state,
                currentUser: { ...state.currentUser, photos: action.photos } as ProfileUserType
            }
        case 'SET_SUCCESS_EDIT':
            return {
                ...state,
                isSuccessEdit: action.success
            }
        default:
            return state;
    }
}

type actionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<actionType>;

export const actions = {
    addPost: () => ({ type: 'ADD_POST' } as const),
    changeTextareaPost: (text: string) => ({ type: 'CHANGE_TEXTAREA_POST', text: text } as const),
    setUser: (user: ProfileUserType) => ({ type: 'SET_USER', user } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    setPhotoProfile: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos } as const),
    setEdit: (success: boolean) => ({ type: 'SET_SUCCESS_EDIT', success } as const),
}

export const getUserThunk = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getUser(userId);
    dispatch(actions.setUser(response));
}

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
}

export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(actions.setStatus(status));
    }
}

export const setPhotoThunk = (file: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.setPhoto(file);
    if (response.resultCode === ResultCodes.Success) {
        dispatch(actions.setPhotoProfile(response.data.photos));
    }
}
export const setProfileSettingsThunk = (profile: ProfileUserType, setStatus: any): ThunkType => async (dispatch) => {
        const response = await profileAPI.setProfileSettings(profile);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(getUserThunk(profile.userId));
            dispatch(actions.setEdit(true));
        } else {
            if (response.messages.length > 0) {
                dispatch(actions.setEdit(false));
                setStatus({ message: response.messages[0] });
            }
        }
    }

export default profileReducer;