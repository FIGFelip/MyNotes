"use client"

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function RootPage(){
  const {token} = useAuth()
  const router = useRouter()
  const [mounted, setMounted]=useState(()=>typeof window!=="undefined")
  useEffect(()=>{
    if(!mounted) return
    if (token){
      router.push("/notes")
    } else{
      router.push("/login")
    }
  }, [token, router, mounted])

  return (
    <div className="min-h-screen bg-[#151f2e] flex items-center justify-center">
      <p className="text-slate-400 text-sm">Carregando...</p>
    </div>
  )
}