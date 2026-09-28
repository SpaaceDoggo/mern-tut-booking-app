import { createContext, useContext } from "react"

export type ToastType = {
    message: string
    type: "SUCCESS" | "ERROR"
}

type AppContext = {
    showToast: (toast:ToastType) => void
    isLogin: boolean
    userId: string
    setUserId: (id:string) => void
    isAuthLoading: boolean
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}