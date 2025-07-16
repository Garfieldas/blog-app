export interface Post {
    id: number,
    title: string,
    body: string,
    authorId: number,
    userId: number,
    created_at: Date,
    updated_at: Date,
    author: {
        id: number,
        userId: number,
        name: string,
        surname: string,
        created_at: Date,
        updated_at: Date
    }
}