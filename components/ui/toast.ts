import * as React from "react"

export type ToastActionElement = React.ReactNode

export type ToastProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Puedes agregar más propiedades según lo que necesites para los toasts
} 