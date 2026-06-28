"use client";
import { useLoginForm } from "@/lib/hooks/useLoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { form, isLoading, handleChange, handleSubmit, error } = useLoginForm();
  return (
    <main>
      <h1>Entrar</h1>
      {error && <p role="alert">{error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          autoComplete="email"
          onChange={(e) => {
            handleChange("email", e.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => {
            handleChange("password", e.target.value);
          }}
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Entrando...":"Entrar"}
      </button>
      <p>Não tem conta? <Link href={"/register"}>cadatre-se</Link></p>
    </main>
  );
}
