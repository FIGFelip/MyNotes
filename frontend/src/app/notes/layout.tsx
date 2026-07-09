"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/notes/Sidebar";
import { SidebarProvider, useSidebar } from "@/providers/sidebar-Provider";
import { ReactNode } from "react";

function NotesLayoutInner({ children }: { readonly children: ReactNode }) {
  const { isOpen, close } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-[#151f2e]">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={close}
        />
      )}
      <Sidebar isOpen={isOpen} onClose={close} />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export default function NotesLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <NotesLayoutInner>{children}</NotesLayoutInner>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
