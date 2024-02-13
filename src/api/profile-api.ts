import { ResponseType, instance } from "./api";

type PhotoResponseDataType = {
    photos: PhotosType,
}

export const profileAPI = {
    getUser: (userId: number) => {
        return instance.get<ProfileUserType>(`profile/${userId}`).then(response => response.data);
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    updateStatus: (status: string) => {
        return instance.put<ResponseType>(`profile/status`, { status }).then(response => response.data);
    },
    setPhoto: (photoFile: File) => {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<PhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    setProfileSettings: (profile: ProfileUserType) => {
        return instance.put<ResponseType>(`profile`, profile).then(response => response.data);
    },
}

