import { useEffect, useState } from "react";
import { Note } from "../types/note";
import { deleteFromTrash, getTrash, recoverFromTrash } from "../api/notes";

export function useTrash() {
  const [trashNotes, setTrashNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTrashNotes() {
      setError(null);
      setIsLoading(true);
      try {
        const trashData = await getTrash();
        setTrashNotes(Array.isArray(trashData)?trashData:[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar lixeira",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void fetchTrashNotes();
  }, []);

  async function handleRecover(id: number) {
    setError(null);
    try {
      await recoverFromTrash(id);
      setTrashNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao recuperar nota");
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await deleteFromTrash(id);
      setTrashNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao apagar nota");
    }
  }

  return {
    trashNotes,
    error,
    isLoading,
    handleDelete,
    handleRecover,
  };
}
