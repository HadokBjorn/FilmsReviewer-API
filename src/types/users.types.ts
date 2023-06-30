export type User = {
    username: string,
    email: string,
    password?: string,
    hash: string
}
export type Session = {
    id: number,
    token: string,
}

export type Error = {
    type: string,
    message: string
}