import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/auth-provider";

export default function RootPage(){
  const {token} = useAuth()
  const router = useRouter()
  useEffect(()=>{
    if (token){
      router.push("/notes")
    } else{
      router.push("/login")
    }
  }, [token, router])

  return null
}