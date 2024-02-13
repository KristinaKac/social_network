import { ResponseType, ResultCodeForCaptcha, ResultCodes, instance } from "./api"

type AuthMeResponseDataType = {
    id: number,
    email: string,
    login: string,
}

type LoginResponseDataType = {
    userId: number,
}

export const AuthAPI = {
    auth: () => {
        return instance.get<ResponseType<AuthMeResponseDataType>>(`auth/me`).then(response => response.data);
    },
    loginAuth: (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>>
            (`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
    },
    logout: () => {
        return instance.delete<ResponseType>(`auth/login`).then(response => response.data);
    },
}
