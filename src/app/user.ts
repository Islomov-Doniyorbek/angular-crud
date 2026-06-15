export interface User {
    id: number
    name: string
    email: string
    isActive: boolean
}
export interface Resp {
    data: User[]
    totalCount: number
}