"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function ProtectedRoute({ children }: {readonly children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [mounted, setMounted]=useState(()=>typeof window!=="undefined")

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if(!token) return null
  if(!mounted) return null
  return <>{children}</>
}
