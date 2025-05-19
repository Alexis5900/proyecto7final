"use client"

import { useToast } from "../../hooks/use-toast"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 p-4 w-full md:max-w-sm z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right"
        >
          <div className="flex-1">
            <h3 className="font-medium">{toast.title}</h3>
            {toast.description && <p className="text-sm text-gray-500 mt-1">{toast.description}</p>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="text-gray-400 hover:text-gray-500">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
