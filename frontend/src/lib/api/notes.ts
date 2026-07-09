import { client } from "./client";
import {Note, CreateNoteDto, UpdateNoteDto} from "@/lib/types/note"

    
export async function getNotes():Promise<Note[]>{
    return client.get<Note[]>("/notes")
}

export async function getNoteById(id:number):Promise<Note>{
    return client.get<Note>(`/notes/${id}`)
}

export async function createNote(data:CreateNoteDto):Promise<Note>{
    return client.post<Note>(`/notes`, data)
}

export async function editNote(id:number, data:UpdateNoteDto):Promise<void>{
    return client.put<void>(`/notes/${id}`, data)
}

export async function moveToTrash(id:number):Promise<void>{
    return client.patch<void>(`/notes/${id}`)
}

export async function getTrash():Promise<Note[]>{
    return client.get<Note[]>("/notes/trash")
}

export async function recoverFromTrash(id:number):Promise<void> {
    return client.patch<void>(`/notes/trash/${id}/recover`)
}

export async function deleteFromTrash(id:number):Promise<void>{
    return client.delete<void>(`/notes/trash/${id}`)
}