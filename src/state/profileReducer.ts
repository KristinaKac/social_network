import { profileAPI } from './../api/profile-api';
import avatar from '../img/avatar.png';
import { ResultCodes } from '../api/api'
import { BaseThunkType, InferActionType } from './redux';
import { usersAPI } from '../api/users-api';
import { UploadFile } from "antd"

type PostType = {
    id: number,
    avatar: string,
    text: string,
    imgs: UploadFile[],
}

const initialValue = {
    posts: [
        { id: 1, avatar: avatar, text: 'hi', imgs: [] },
        { id: 2, avatar: avatar, text: 'My name is Kristina', imgs: [] },
    ] as Array<PostType>,
    currentUser: null as ProfileUserType | null,
    currentStatus: '',
    isSuccessEdit: false,
    cover: null as File | null,
    followers: null as Array<UsersType> | null,
}

type InitialValueType = typeof initialValue;

const profileReducer = (state = initialValue, action: actionType): InitialValueType => {

    switch (action.type) {
        case 'ADD_POST':
            const newPost = {
                id: performance.now(),
                avatar: avatar,
                text: action.post,
                imgs: action.imgs
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
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
        case 'SET_COVER':
            return {
                ...state,
                cover: action.img
            }
        case 'SET_FOLLOWERS':
            return {
                ...state,
                followers: action.followers
            }
        default:
            return state;
    }
}

type actionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<actionType>;

export const actions = {
    addPost: (post: string, imgs: UploadFile[]) => ({ type: 'ADD_POST', post, imgs } as const),
    changeTextareaPost: (text: string) => ({ type: 'CHANGE_TEXTAREA_POST', text: text } as const),
    setUser: (user: ProfileUserType) => ({ type: 'SET_USER', user } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    setPhotoProfile: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos } as const),
    setCover: (img: File) => ({ type: 'SET_COVER', img } as const),
    setEdit: (success: boolean) => ({ type: 'SET_SUCCESS_EDIT', success } as const),
    setFollowers: (followers: Array<UsersType>) => ({ type: 'SET_FOLLOWERS', followers } as const),
}

export const getUserThunk = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getUser(userId);
    dispatch(actions.setUser(response));
}
export const getFollowersThunk = (): ThunkType =>
    async (dispatch) => {
        const filter = {
            term: '',
            friend: true
        }
        const response = await usersAPI.getUsers(1, 9, filter);
        dispatch(actions.setFollowers(response.items));
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