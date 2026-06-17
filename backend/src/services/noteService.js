import * as noteRepository from "../repositories/noteRepository.js";

export async function get(userId) {
  if (!userId) throw new Error("Usuário não identificado");
  return noteRepository.findNotesById(userId);
}

export async function getFromTrash(userId) {
  if (!userId) throw new Error("Usário não identificado");
  return noteRepository.getFromTrashById(userId);
}

export async function create(userId, title, body) {
  if (!userId) throw new Error("Usuário não identificado");
  if (!title || !body || title.trim() == "" || body.trim() === "") {
    throw new Error("É necessário título e corpo do texto");
  }
  if (title.length > 100) {
    throw new Error("Título muito longo. limite: 100 caracteres");
  }
  return noteRepository.createNewNote(userId, title, body);
}

export async function edit(id, userId, title, body) {
  if (!userId) throw new Error("Usuário não identificado");
  if (!id) throw new Error("Nota não encontrada");
  const noteId = Number(id);
  return noteRepository.editNoteById(noteId, userId, title, body);
}

export async function softDelete(id, userId) {
  if (!userId) throw new Error("Usuário não identificado");
  const noteId = Number(id);
  return noteRepository.softDeleteById(noteId, userId);
}

export async function recover(id, userId) {
  if (!id) throw new Error("Nota não encontrada");
  if (!userId) throw new Error("Usuário não identificado");
  const noteId = Number(id);
  return noteRepository.restore(noteId, userId);
}

export async function hardDelete(id, userId) {
  if (!userId) throw new Error("Usuário não identificado");
  const noteId = Number(id);
  return noteRepository.hardDeleteById(noteId, userId);
}
