"use client";

import { useState } from "react";
import { useNotes } from "@/lib/hooks/useNotes";
import { Note } from "@/lib/types/note";
import { NoteList } from "@/components/notes/NoteList";
import { NoteArea } from "@/components/notes/NoteArea";
import { useSidebar } from "@/providers/sidebar-Provider";
import { Toast } from "@/components/ui/Toast";

export type NoteSelection = Note | "new" | null;

export default function NotesPage() {
  const [toastVisible, setToastVisible]=useState(false)
  const [toastMessage, setToastMessage]=useState("")
  const {open}= useSidebar()
  const [selected, setSelected] = useState<NoteSelection>(null);
  const {
    handleCreate,
    handleEdit,
    handleMoveToTrash,
    notes,
    isLoading,
    error,
  } = useNotes();

  function showToast(message:string){
    setToastMessage(message)
    setToastVisible(true)
  }

  async function handleSave(title: string, body: string) {
    if (selected == "new") {
      const created = await handleCreate({ title, body });
      if (created) {
        setSelected(created);
      showToast("Nota criada!")
      }
    } else if (selected !== null) {
      await handleEdit(selected.id, { title, body });
      setSelected({ ...selected, title, body });
      showToast("Nota editada!")
    }
  }

  async function handleTrash(id: number) {
    await handleMoveToTrash(id);
    showToast("Nota enviada à lixeira!")
    if (selected !== "new" && selected?.id == id) {
      setSelected(null);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
        <div
        className={`
        border-r border-[#2a3a4a] bg-[#1a2332] flex flex-col
        ${selected ? "hidden md:flex md:w-72" : "flex w-full md:w-72"}
      `}
      >
        <NoteList
          onMenuOpen={open}
          notes={notes}
          isLoading={isLoading}
          selected={selected}
          onSelect={setSelected}
          onNew={() => setSelected("new")}
        />
      </div>
      <div
        className={`flex-1 bg-[#151f2e] flex flex-col ${selected ? "flex" : "hidden md:flex"}`}
      >
        <NoteArea
          key={
            selected === null
              ? "empty"
              : selected === "new"
                ? "new"
                : selected.id
          }
          selected={selected}
          onNew={() => setSelected("new")}
          onSave={handleSave}
          onTrash={handleTrash}
          onBack={() => setSelected(null)}
        />
      </div>
      <Toast
      message={toastMessage}
      visible={toastVisible}
      onHide={()=>setToastVisible(false)}
      />
      {error && (
        <p
          role="alert"
          className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          {error}
        </p>
      )}
    </div>
  );
}
