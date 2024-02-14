type PostType = {
    id: number,
    avatar: string,
    text: string
}
type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null,
    large: string | null,
}
type ProfileUserType = {
    userId: number
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts?: ProfileContactsType
    photos?: PhotosType
}
type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
type ContactsType = {
    id: number,
    name: string
}
type DialogsType = {
    id: number,
    message: string
}
type FilterType = {
    term: string,
    friend: null | boolean
}