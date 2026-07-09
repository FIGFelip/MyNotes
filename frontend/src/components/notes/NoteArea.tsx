"use client";

import { Note } from "@/lib/types/note";
import { useState } from "react";

type NoteAreaProps = {
  selected: "new" | null | Note;
  onNew: () => void;
  onSave: (title: string, body: string) => void;
  onTrash: (id: number) => void;
  onBack: () => void;
};

export function NoteArea({
  selected,
  onBack,
  onNew,
  onSave,
  onTrash,
}: NoteAreaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(
    selected !== null && selected !== "new" ? (selected.title ?? "") : "",
  );
  const [body, setBody] = useState(
    selected !== null && selected !== "new" ? (selected.body ?? "") : "",
  );

  if (selected === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
        <p className="text-lg">Selecione uma nota ou crie uma</p>
        <button
          onClick={onNew}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-2xl transition-colors"
        >
          +
        </button>
      </div>
    );
  }

  if (selected === "new") {
    return (
      <div className="flex flex-col h-full p-6 gap-4">
        <input
          className="bg-transparent text-white text-2xl font-semibold outline-none border-b border-[#2a3a4a] pb-2 placeholder:text-slate-600"
          placeholder="Título"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="O que deseja escrever hoje?"
          className="flex-1 bg-transparent text-slate-300 outline-none resize-none placeholder:text-slate-600 leading-relaxed"
          onChange={(e) => setBody(e.target.value)}
          name=""
          value={body}
          id=""
        />
        <div>
          <button className="px-4 py-2 rounded-md text-slate-400 hover:text-white hover:bg-[#2a3a4a] transition-colors" onClick={onBack}>Cancelar</button>
          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors" onClick={() => onSave(title, body)}>Salvar</button>
        </div>
      </div>
    );
  }
  if (!isEditing) {
    return (
      <div className="flex flex-col h-full p-6 gap-4" >
        <div className="flex items-center justify-between border-b border-[#2a3a4a] pb-2" >
        <h2 className="text-white text-2xl font-semibold" >{title}</h2>
        <button className="text-slate-400 hover:text-white transition-colors" onClick={onBack}>✕</button>
        </div>
        <p className="flex-1 text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto" >{body}</p>
        <div className="flex gap-2 justify-end border-t border-[#2a3a4a] pt-4" >
        <button className="px-4 py-2 rounded-md text-red-400 hover:text-white hover:bg-red-600 transition-colors" onClick={() => onTrash(selected.id)}>
          🗑️ Descartar</button>
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors" onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full p-6 gap-4">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          name="title"
          className="bg-transparent text-white text-2xl font-semibold outline-none border-b border-[#2a3a4a] pb-2"
        />
        <textarea
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
          name="body"
          placeholder="O que deseja escrever hoje?"
          className="flex-1 bg-transparent text-slate-300 outline-none resize-none leading-relaxed"
        />
      <div className="flex gap-2 justify-end border-t border-[#2a3a4a] pt-4" id="btns-div">
        <button className="px-4 py-2 rounded-md text-slate-400 hover:text-white hover:bg-[#2a3a4a] transition-colors" onClick={() => setIsEditing(false)}>cancelar</button>
        <button
        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          onClick={() => {
            onSave(title, body);
            setIsEditing(false);
          }}
          id="save-btn"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
