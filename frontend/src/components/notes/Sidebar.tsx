"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLougout() {
    logout();
    router.push("/login");
  }

  return (
    <aside
      className={`  fixed md:static inset-y-0 left-0 z-20
      w-52 min-h-screen
      bg-[#1e2a3a] border-r border-[#2a3a4a]
      flex flex-col gap-2 p-4
      transition-transform duration-200
         ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <button
        onClick={onClose}
        className="self-end text-slate-400 hover:text-white md:hidden"
      >
        ✕
      </button>
      <nav className="flex flex-col gap-1 mt-4">
        <Link
          className="text-slate-300 hover:text-white hover:bg-[#2a3a4a] px-3 py-2 rounded-md transition-colors"
          href={"/notes"}
          onClick={onClose}
        >
        Notas
        </Link>

        <Link
          className="text-slate-300 hover:text-white hover:bg-[#2a3a4a] px-3 py-2 rounded-md transition-colors"
          href={"/notes/trash"}
          onClick={onClose}
        >
        Lixeira
        </Link>
      </nav>
      <button
        onClick={handleLougout}
        className="text-red-600 hover:text-white hover:bg-[#2a3a4a] px-3 py-2 rounded-md transition-colors text-left w-full"
      >
        Logout
      </button>
    </aside>
  );
}
