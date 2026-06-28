import { useState } from "react";
import { useRouter } from "next/router";
import { register as registerApi} from "@/lib/api/auth";
import { useAuth } from "@/providers/auth-provider";

type FormState={
    email:string
    password:string
}


export function useRegisterForm(){
    const [form, setForm]= useState<FormState>({email:"", password:""})
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const router = useRouter()
    function handleChange(field:keyof FormState, value:string){
        setForm((prev)=>({...prev, [field]:value}))
    }
    async function handleSubmit(){
        setIsLoading(true)
        setError(null)
        try{
            await registerApi({email:form.email, password:form.password})
            router.push("/login")
        } catch(err){
            setError(err instanceof Error ? err.message:"Erro ao cadastrar")
        } finally{
            setIsLoading(false)
        }
    }
    return {form, isLoading, handleChange, handleSubmit, error}
}