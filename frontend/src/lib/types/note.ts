export type NoteStatus = "active" | "inactive" | "archived"

export type Note = {
    id: number;
    title: string | null
    body: string | null
    status: NoteStatus
    userId:number
    createdAt:string
    deletedAt:string|null
}


export type CreateNoteDto = {
    title: string
    body:string
}

export type UpdateNoteDto = {
    title: string
    body:string
}

