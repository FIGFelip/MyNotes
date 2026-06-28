"use client"

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { User } from "@/lib/types/auth";
import { TOKEN_KEY } from "@/lib/constants";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (globalThis.window === undefined) return null;
    const saved = localStorage.getItem("mynotes_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (globalThis.window === undefined) return null;
    return localStorage.getItem(TOKEN_KEY);
  });
  const [isLoading, setIsLoading] = useState(false);

  function login(user: User, token: string) {
    setUser(user);
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("mynotes_user", JSON.stringify(user));
  }
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mynotes_user");
    localStorage.removeItem(TOKEN_KEY);
  }

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro do provider");
  return ctx;
}
