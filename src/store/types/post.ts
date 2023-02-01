export interface PostI{
    title: string
    desc: string
    uid: string
    user: {
        avatarUrl: string
        name: string
    }
    postImgUrl: string
    createdAt: any
    id: string
}