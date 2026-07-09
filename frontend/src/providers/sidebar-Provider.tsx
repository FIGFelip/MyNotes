"use client";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type SidebarContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("Sidebar deve ser usado dentro do sidebarProvider");
  }
  return ctx;
}
