export type User = {
    username: string,
    image: string,
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

export type Movie = {
    userId?:number,
    title: string,
    synopsis: string,
    date: string,
    genre: string,
    poster: string,
    watched: boolean,
}