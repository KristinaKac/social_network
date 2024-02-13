import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "74d2740e-44d1-4080-ac16-b8361b1891d4"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<String>,
    resultCode: RC
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}