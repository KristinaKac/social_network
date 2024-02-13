import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "74d2740e-44d1-4080-ac16-b8361b1891d4"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

type GetUsersResponseType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}
type AuthMeResponseType = {
    resultCode: ResultCodes,
    messages: Array<String>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha,
    messages: Array<string>,
    data: {
        userId: number
    }
}
type SetPhotoResponseType = {
    data: {
        photos: PhotosType
    },
    messages: Array<string>,
    resultCode: ResultCodes
}
type CommonResponseType = {
    data: Object,
    messages: Array<String>,
    resultCode: ResultCodes
}
type CaptchaResponseType = {
    url: string
}
export enum ResultCodes {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export const getUsers = (currentPage: number, maxUsersOnPage: number) => {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${maxUsersOnPage}`).then(response => response.data);
}
export const getUser = (userId: number) => {
    return instance.get<ProfileUserType>(`profile/${userId}`).then(response => response.data);
}
export const followAPI = (id: number) => {
    return instance.post<CommonResponseType>(`follow/${id}`).then(response => response.data);
}
export const unfollowAPI = (id: number) => {
    return instance.delete<CommonResponseType>(`follow/${id}`).then(response => response.data);
}
export const getStatus = (userId: number) => {
    return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
}
export const updateStatus = (status: string) => {
    return instance.put<CommonResponseType>(`profile/status`, { status }).then(response => response.data);
}
export const auth = () => {
    return instance.get<AuthMeResponseType>(`auth/me`).then(response => response.data);
}
export const loginAuth = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
}
export const logout = () => {
    return instance.delete<CommonResponseType>(`auth/login`).then(response => response.data);
}
export const setPhoto = (photoFile: File) => {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<SetPhotoResponseType>(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data);
}
export const setProfileSettings = (profile: ProfileUserType) => {
    return instance.put<CommonResponseType>(`profile`, profile).then(response => response.data);
}
export const getCaptcha = () => {
    return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then(response => response.data);
}