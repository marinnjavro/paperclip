import { createContext } from 'react'

interface ToastContext {
  open: (type: string, content: string) => void
}

export const ToastContext = createContext<ToastContext>({} as ToastContext)
