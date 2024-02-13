import { ResponseType, instance } from "./api";

type GetUsersResponseType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}

export const usersAPI = {
    getUsers: (currentPage: number, maxUsersOnPage: number) => {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${maxUsersOnPage}`).then(response => response.data);
    },
    followAPI: (id: number) => {
        return instance.post<ResponseType>(`follow/${id}`).then(response => response.data);
    },
    unfollowAPI: (id: number) => {
        return instance.delete<ResponseType>(`follow/${id}`).then(response => response.data);
    },
}
