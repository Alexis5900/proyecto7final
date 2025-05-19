import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [etherealUrl, setEtherealUrl] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setEtherealUrl("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3005/api/usuarios/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.mensaje)
        if (data.url) setEtherealUrl(data.url)
      } else {
        setError(data.mensaje || "Error al recuperar contraseña")
      }
    } catch (err) {
      setError("Error de red o del servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Recuperar Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {etherealUrl && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Puedes ver el correo de recuperación aquí:</p>
              <a href={etherealUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                Ver correo de recuperación en Ethereal
              </a>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? "Enviando..." : "Enviar correo de recuperación"}
            </Button>
          </form>
          <Button
            type="button"
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={() => navigate('/login')}
          >
            Volver al login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 