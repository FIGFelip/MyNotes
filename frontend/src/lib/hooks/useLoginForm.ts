import {useState} from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import {login as loginApi} from "@/lib/api/auth"


type FormState = {
    email: string
    password:string
}

export function useLoginForm(){
    const [form, setForm] = useState<FormState>({email:"", password:""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string|null>(null)

    const router = useRouter()
    const {login} = useAuth()

    function handleChange(field: keyof FormState, value:string){
        setForm((prev)=>({...prev, [field]:value}))
    }

    async function handleSubmit(){
        setIsLoading(true)
        setError(null)
        try{
            const {token} = await loginApi({
                email:form.email,
                password:form.password
            })
            login({id:0, email:form.email}, token)
            router.push("/notes")
        }catch(err){
            setError(err instanceof Error ? err.message : "Erro ao atentar login")
        } finally{
            setIsLoading(false)
        }
    }

    return{
        form, 
        isLoading, 
        error,
        handleChange,
        handleSubmit,
    }
}