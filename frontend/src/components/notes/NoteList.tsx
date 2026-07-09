"use client";

import { Note } from "@/lib/types/note";
import { NoteItem } from "./NoteItem";
import { ChangeEvent, useState } from "react";

type NoteListProps = {
  notes: Note[];
  isLoading: boolean;
  selected: null | "new" | Note;
  onSelect: (note: Note) => void;
  onNew: () => void;
  onMenuOpen: () => void;
};

export function NoteList({
  notes,
  isLoading,
  selected,
  onSelect,
  onNew,
  onMenuOpen
}: NoteListProps) {
  const [search, setSearch] = useState("");
  function searchNotes(searchResult: Note[], query: string): Note[] {
    return notes.filter((note) => {
      return (
        note.title?.toLowerCase().includes(query.toLowerCase()) ||
        note.body?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredNotes = searchNotes(notes, search);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>Carregando...</p>
      </div>
    );
  return (
    <div className="flex flex-col h-full" id="note-list-div">
      <div className="p-3 border-b border-[#2a3a4a] flex gap-2 items-center">
  <button
    onClick={onMenuOpen}
    className="md:hidden px-2 py-2 text-slate-400 hover:text-white transition-colors"
    aria-label="abrir menu"
  >
    ☰
  </button>
  <button
    onClick={onNew}
    className="flex-1 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
  >
    + Nova nota
  </button>
</div>
      {/*Search*/}
      <div className="p-3 border-b border-[#2a3a4a]" id="search-bar-div">
        <input
          className="w-full bg-[#0f1923] text-slate-300 placeholder:text-slate-600 px-3 py-2 rounded-md text-sm outline-none border border-[#2a3a4a] focus:border-blue-600 transition-colors"
          type="text"
          onChange={handleSearchChange}
          placeholder="Buscar..."
        />
      </div>
      {/*Lista de notas */}
      <div className="flex-1 overflow-y-auto p-2" id="note-list">
        {filteredNotes.length === 0 ? (
          <p className="text-slate-500 text-sm text-center mt-8">
            {search ? "Nenhuma nota encontrada" : "Sem notas na lista"}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {filteredNotes.map((note) => (
              <li key={note.id}>
                <NoteItem
                  note={note}
                  onSelect={() => onSelect(note)}
                  isSelected={
                    selected !== null &&
                    selected !== "new" &&
                    selected.id === note.id
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
