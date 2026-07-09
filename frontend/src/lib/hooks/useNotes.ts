"use client"

import { useState, useEffect } from "react";
import { getNotes, moveToTrash, createNote, editNote } from "@/lib/api/notes";
import { Note, CreateNoteDto, UpdateNoteDto } from "@/lib/types/note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar notas");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchNotes();
  }, []);

  async function handleCreate(data: CreateNoteDto) {
    setError(null);
    try {
      const newNote = await createNote(data);
      setNotes((prev) => [newNote, ...prev]);
      return newNote
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar nota");
    }
  }

  async function handleEdit(id: number, data: UpdateNoteDto) {
    setError(null);
    try {
      await editNote(id, data);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, ...data } : note)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao editar nota");
    }
  }

  async function handleMoveToTrash(id: number) {
    setError(null);
    try {
      await moveToTrash(id);
      setNotes((prev) => prev.filter((note) => note.id != id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao mover para a lixeira",
      );
    }
  }

  return {
    notes,
    error,
    isLoading,
    handleEdit,
    handleCreate,
    handleMoveToTrash,
  };
}
