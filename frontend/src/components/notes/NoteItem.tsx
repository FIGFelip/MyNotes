"use client"


import { Note } from "@/lib/types/note";
import { inputLimit } from "@/lib/utils/inputLimit";
type NoteItemProps = {
  note: Note;
  isSelected: boolean;
  onSelect: () => void;
};

export function NoteItem({ note, isSelected, onSelect }: NoteItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        px-3 py-3 rounded-md cursor-pointer transition-colors
        border-l-2
        ${isSelected
          ? "bg-[#1e3a5f] border-blue-500 text-white"
          : "bg-transparent border-transparent text-slate-300 hover:bg-[#1a2d42] hover:border-blue-800"
        }
      `}
    >
      <h6 className="font-medium text-sm truncate">{inputLimit(note.title?? "Sem título")}</h6>

      <p className="text-xs text-slate-500 mt-1 truncate" >{inputLimit(note.body)}</p>
    </div>
  );
}
