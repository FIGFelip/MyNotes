"use client";
import { useLoginForm } from "@/lib/hooks/useLoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { form, isLoading, handleChange, handleSubmit, error } = useLoginForm();
  return (
    <main className="min-h-screen bg-[#151f2e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-2xl font-semibold text-center">Entrar</h1>
          <p className="text-slate-400 text-sm text-center ">Bem-vindo de volta</p>
        </div>
        {error && (
          <p
            className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-md"
            role="alert"
          >
            {error}
          </p>
        )}
        <div className="flex flex-col gap-4" >
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-300 text-sm" htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={form.email}
            autoComplete="email"
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
            disabled={isLoading}
            className="bg-[#0f1923] border border-[#2a3a4a] focus:border-blue-600 text-slate-300 placeholder:text-slate-600 px-3 py-2 rounded-md text-sm outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-1.5" >
          <label className="text-slate-300 text-sm" htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
            disabled={isLoading}
            className="bg-[#0f1923] border border-[#2a3a4a] focus:border-blue-600 text-slate-300 placeholder:text-slate-600 px-3 py-2 rounded-md text-sm outline-none transition-colors disabled:opacity-50"
            autoComplete="current-password"
          />
        </div>
        </div>
        <button className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <p className="text-slate-500 text-sm text-center" >
          Não tem conta?{" "} <Link className="text-blue-400 hover:text-blue-300 transition-colors" href={"/register"}>cadatre-se</Link>
        </p>
      </div>
    </main>
  );
}
