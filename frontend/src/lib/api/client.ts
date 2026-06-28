import { API_BASE_URL, TOKEN_KEY } from "@/lib/constants";

type httpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

async function request<T>(endpoint: string, method: httpMethod, body?:unknown):Promise<T>{
    const token = typeof window === "undefined" ? localStorage.getItem(TOKEN_KEY) : null

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers:{
            "Content-Type":"application/json",
            ...(token ? {Authorization: `Bearer ${token}`}: {}),
        },
        ...(body?{body: JSON.stringify(body) } : {})
    })

    if(!response.ok){
        const error = await response.json().catch(()=>({}))
        throw new Error(error.message??"request failed")
    }
    return response.json() as Promise<T>
}

export const client = {
    get: <T>(endpoint:string)                       =>request<T>(endpoint, "GET"),
    post:<T>(endpoint:string, body:unknown)         =>request<T>(endpoint, "POST", body),
    put: <T>(endpoint:string, body:unknown)         =>request<T>(endpoint, "PUT", body),
    patch:<T>(endpoint:string, body?:unknown)       =>request<T>(endpoint, "PATCH", body),
    delete:<T>(endpoint:string)                     =>request<T>(endpoint, "DELETE")
}