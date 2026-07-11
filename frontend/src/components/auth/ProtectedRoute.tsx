"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function ProtectedRoute({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { token } = useAuth();
  const router = useRouter();
  const [mounted] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router, mounted]);

  if (!mounted) return null;
  if (!token) return null;
  return <>{children}</>;
}
