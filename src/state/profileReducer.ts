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
    likes: number[],
    comments: Array<PostCommentType>
}

const initialValue = {
    posts: [
        {
            id: 1, avatar: avatar, text:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, error. Suscipit beatae repreh enderit quod non voluptatem quis! Culpa quos accusamus a, debitis sunt harum necessitatibus quo porro neque deserunt voluptatem.',
            imgs: [], likes: [], comments: []
        },
        { id: 2, avatar: avatar, text: 
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, error. Suscipit beatae repreh enderit quod non voluptatem quis! Culpa quos accusamus a, debitis sunt harum necessitatibus quo porro neque deserunt voluptatem.Suscipit beatae reprehenderit quod non voluptatem quis! Culpa quos accusamus a, debitis sunt harum necessitatibus quo porro neque deserunt voluptatem.', 
            imgs: [], likes: [], comments: [] },
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
                imgs: action.imgs,
                likes: action.likes,
                comments: action.comments,
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
        case 'SET_POST_LIKES':
            return {
                ...state,
                posts: state.posts.map((post, i, arr) => {
                    if (post.id === action.postId && !post.likes.includes(action.authUserId)) {
                        arr[i].likes.push(action.authUserId);
                    } else if (post.id === action.postId && post.likes.includes(action.authUserId)) {
                        arr[i].likes = arr[i].likes.filter(item => item !== action.authUserId);
                    }
                    return arr[i];
                })
            }
        case 'SET_POST_COMMENTS':
            return {
                ...state,
                posts: state.posts.map((post, i, arr) => {
                    if (post.id === action.postId) {
                        arr[i].comments.push({ user: action.user, text: action.text });
                    }
                    return arr[i];
                })
            }
        default:
            return state;
    }
}

type actionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<actionType>;

export const actions = {
    addPost: (post: string, imgs: UploadFile[], likes: number[], comments: PostCommentType[]) => ({ type: 'ADD_POST', post, imgs, likes, comments } as const),
    changeTextareaPost: (text: string) => ({ type: 'CHANGE_TEXTAREA_POST', text: text } as const),
    setUser: (user: ProfileUserType) => ({ type: 'SET_USER', user } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    setPhotoProfile: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos } as const),
    setCover: (img: File) => ({ type: 'SET_COVER', img } as const),
    setEdit: (success: boolean) => ({ type: 'SET_SUCCESS_EDIT', success } as const),
    setFollowers: (followers: Array<UsersType>) => ({ type: 'SET_FOLLOWERS', followers } as const),
    setPostLikes: (postId: number, authUserId: number) => ({ type: 'SET_POST_LIKES', postId, authUserId } as const),
    addPostComment: (postId: number, user: ProfileUserType, text: string) => ({ type: 'SET_POST_COMMENTS', postId, user, text } as const)
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