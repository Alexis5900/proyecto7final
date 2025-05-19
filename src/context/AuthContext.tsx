"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  address?: string
  phone?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: { name: string; address?: string; phone?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verificarUsuario = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/verificar-usuario`, {
          headers: {
            "x-auth-token": token
          }
        })

        const data = await res.json()

        if (res.ok) {
          const usuario = data.usuario
          const newUser = {
            id: usuario._id,
            name: usuario.username,
            email: usuario.email
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
        } else {
          logout()
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error)
        logout()
      }

      setLoading(false)
    }

    verificarUsuario()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.mensaje || "Error al iniciar sesión")
    }

    const token = data.token
    localStorage.setItem("token", token)

    const payload = JSON.parse(atob(token.split('.')[1]))
    const newUser = {
      id: payload.id,
      name: payload.username,
      email: payload.email
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.mensaje || "Error al registrar")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const updateProfile = async (data: { name: string; address?: string; phone?: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (user) {
      const updatedUser = {
        ...user,
        ...data,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
