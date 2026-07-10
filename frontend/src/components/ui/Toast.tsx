import { useState, useEffect } from "react";


type ToastProps={
    message:string
    visible:boolean
    onHide:()=>void
}

export function Toast({message, visible, onHide}:ToastProps){
    useEffect(()=>{
        if(visible){
            const timer = setTimeout(() => {
                onHide()
            }, 3000);
            return ()=>clearTimeout(timer)
        }
    }, [visible])
    if(!visible) return null
    return(
        <div className={"pt-4 pb-4 rounded-xl pr-2 pl-2 fixed right-3 bottom-20 bg-green-600 drop-shadow-black shadow-black"} >
            <p className="text-center text-white">{message}</p>
        </div>
    )
}