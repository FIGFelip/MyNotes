"use client";
import { useRegisterForm } from "@/lib/hooks/useRegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  const { form, isLoading, handleChange, handleSubmit, error } =
    useRegisterForm();

  return (
    <main>
      <h1>Criar conta</h1>
      {error && <p role="alert">{error}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={form.email}
          autoComplete="email"
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          autoComplete="new-password"
          disabled={isLoading}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>{isLoading? "Criando conta...":"Criar conta"}</button>
      <p>
        Já tem conta? <Link href={"/login"}>Entrar</Link>
      </p>
    </main>
  );
}
