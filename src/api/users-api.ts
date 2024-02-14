import { ResponseType, instance } from "./api";

type GetUsersResponseType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}

export const usersAPI = {
    getUsers: (currentPage: number, maxUsersOnPage: number, {term = '', friend = null}: FilterType) => {
        return instance.get<GetUsersResponseType>
            (`users?page=${currentPage}&count=${maxUsersOnPage}&term=${term}&friend=${friend}`)
            .then(response => response.data);
    },
    followAPI: (id: number) => {
        return instance.post<ResponseType>(`follow/${id}`).then(response => response.data);
    },
    unfollowAPI: (id: number) => {
        return instance.delete<ResponseType>(`follow/${id}`).then(response => response.data);
    },
}
