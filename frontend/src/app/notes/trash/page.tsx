"use client";
import { useTrash } from "@/lib/hooks/useTrash";
import { inputLimit } from "@/lib/utils/inputLimit";
import { useSidebar } from "@/providers/sidebar-Provider";

export default function TrashPage() {
  const { handleDelete, handleRecover, error, trashNotes, isLoading } =
    useTrash();
    const {open}=useSidebar() 

  if (isLoading) return <p>Carregando lixeira...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-3 border-b border-[#2a3a4a] flex items-center gap-2">
        <button
          onClick={open}
          className="md:hidden px-2 py-2 text-slate-400 hover:text-white transition-colors"
          aria-label="abrir menu"
        >
          ☰
        </button>
        <h1 className="text-white font-semibold">Lixeira</h1>
      </div>

      {trashNotes.length === 0 ? (
        <div className="flex items-center justify-center flex-1 text-slate-500">
          <p>Sem notas na lixeira</p>
        </div>
      ) : (
      <ul className="flex flex-col gap-1 p-2 overflow-y-auto" >
        {trashNotes.map((note) => (
          <li key={note.id} className="flex items-center justify-between px-3 py-3 rounded-md bg-[#1a2332] border border-[#2a3a4a]" >
            <div>
              <h6 className="text-slate-300 text-sm font-medium">{inputLimit(note.title)}</h6>
              <p className="text-slate-500 text-xs mt-1" >{inputLimit(note.body)}</p>
            </div>
            <div className="flex gap-2" >
              <button className="px-3 py-1 rounded-md text-xs bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              onClick={() => handleRecover(note.id)} id="recover-btn">
                recover
              </button>
              <button
                className="px-3 py-1 rounded-md text-xs bg-red-600 hover:bg-red-500 text-white transition-colors"
                onClick={() => handleDelete(note.id)}
                id="perm-delete-btn"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
