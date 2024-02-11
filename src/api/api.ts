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
type GetUserType = {
    
}

export const getUsers = (currentPage: number, maxUsersOnPage: number) => {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${maxUsersOnPage}`).then(response => response.data);
}
export const getUser = (userId: number) => {
    return instance.get(`profile/${userId}`);
}
export const followAPI = (id: number) => {
    return instance.post(`follow/${id}`);
}
export const unfollowAPI = (id: number) => {
    return instance.delete(`follow/${id}`);
}
export const getStatus = (userId: number) => {
    return instance.get(`profile/status/${userId}`);
}
export const updateStatus = (status: string) => {
    return instance.put(`profile/status`, { status });
}
export const auth = () => {
    return instance.get(`auth/me`);
}
export const loginAuth = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
}
export const logout = () => {
    return instance.delete(`auth/login`);
}
export const setPhoto = (photoFile: File) => {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const setProfileSettings = (profile: ProfileUserType) => {
    return instance.put(`profile`, profile);
}
export const getCaptcha = () => {
    return instance.get(`security/get-captcha-url`);
}