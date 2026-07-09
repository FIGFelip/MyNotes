import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ReactNode } from "react";

export default function TrashLayout({children}:{readonly children:ReactNode}){
    return(
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}