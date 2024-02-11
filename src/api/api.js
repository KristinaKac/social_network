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
    return instance.put(`profile/status`, { status });
}
export const auth = () => {
    return instance.get(`auth/me`);
}
export const loginAuth = (email, password, rememberMe, captcha = null) => {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
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
export const setProfileSettings = (profile) => {
    return instance.put(`profile`, profile);
}
export const getCaptcha = () => {
    return instance.get(`security/get-captcha-url`);
}



// export const getUsers = (currentPage: number, maxUsersOnPage: number) => {
//     return instance.get(`users?page=${currentPage}&count=${maxUsersOnPage}`);
// }
// export const getUser = (userId: number) => {
//     return instance.get(`profile/${userId}`);
// }
// export const followAPI = (id: number) => {
//     return instance.post(`follow/${id}`);
// }
// export const unfollowAPI = (id: number) => {
//     return instance.delete(`follow/${id}`);
// }
// export const getStatus = (userId: number) => {
//     return instance.get(`profile/status/${userId}`);
// }
// export const updateStatus = (status: string) => {
//     return instance.put(`profile/status`, { status });
// }
// export const auth = () => {
//     return instance.get(`auth/me`);
// }
// export const loginAuth = (email: string, password: string, rememberMe: boolean, captcha = null) => {
//     return instance.post(`auth/login`, { email, password, rememberMe, captcha });
// }
// export const logout = () => {
//     return instance.delete(`auth/login`);
// }
// export const setPhoto = (photoFile: string) => {
//     const formData = new FormData();
//     formData.append("image", photoFile);
//     return instance.put(`profile/photo`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// }
// export const setProfileSettings = (profile: ProfileSendInfoType) => {
//     return instance.put(`profile`, profile);
// }
// export const getCaptcha = () => {
//     return instance.get(`security/get-captcha-url`);
// }