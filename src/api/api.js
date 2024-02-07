import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "74d2740e-44d1-4080-ac16-b8361b1891d4"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const getUsers = (currentPage, maxUsersOnPage) => {
    return instance.get(`users?page=${currentPage}&count=${maxUsersOnPage}`);
}
export const getUser = (userId) => {
    return instance.get(`profile/${userId}`);
}
export const followAPI = (id) => {
    return instance.post(`follow/${id}`);
}
export const unfollowAPI = (id) => {
    return instance.delete(`follow/${id}`);
}
export const getStatus = (userId) => {
    return instance.get(`profile/status/${userId}`);
}
export const updateStatus = (status) => {
    return instance.put(`profile/status`, {status});
}
export const auth = () => {
    return instance.get(`auth/me`);
}
export const loginAuth = (email, password, rememberMe) => {
    return instance.post(`auth/login`, {email, password, rememberMe});
}
export const logout = () => {
    return instance.delete(`auth/login`);
}
export const setPhoto = (photoFile) => {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}