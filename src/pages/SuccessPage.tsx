import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function SuccessPage() {
  const { user } = useAuth()
  const [ultimaCompra, setUltimaCompra] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUltimaCompra = async () => {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3005/api/usuarios/compras", {
          headers: {
            "x-auth-token": token || ""
          }
        })
        const compras = await res.json()
        if (Array.isArray(compras) && compras.length > 0) {
          setUltimaCompra(compras[0]) // La más reciente
        } else {
          setUltimaCompra(null)
        }
      } catch (err) {
        setError("No se pudo cargar el resumen de tu compra.")
      } finally {
        setLoading(false)
      }
    }
    fetchUltimaCompra()
  }, [user])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-600">¡Pago realizado con éxito!</h1>
      <p>Gracias por tu compra. Pronto recibirás tu pedido.</p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resumen de tu compra</h2>
        {loading ? (
          <div>Cargando resumen...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : !ultimaCompra ? (
          <div>No se encontró información de la última compra.</div>
        ) : (
          <>
            <div className="mb-2"><b>Fecha:</b> {new Date(ultimaCompra.fecha).toLocaleString()}</div>
            <div className="mb-2"><b>Dirección:</b> {ultimaCompra.direccion}</div>
            <div className="mb-2"><b>Teléfono:</b> {ultimaCompra.telefono}</div>
            <div className="mb-2"><b>Estado:</b> {ultimaCompra.estado}</div>
            <div className="mb-2"><b>Método de pago:</b> {ultimaCompra.metodoPago}</div>
            {ultimaCompra.stripeId && (
              <div className="mb-2"><b>ID de Stripe:</b> {ultimaCompra.stripeId}</div>
            )}
            {ultimaCompra.notas && (
              <div className="mb-2"><b>Notas:</b> {ultimaCompra.notas}</div>
            )}
            <ul className="mb-4">
              {ultimaCompra.productos.map((item: any, idx: number) => (
                <li key={idx} className="mb-2">
                  {item.nombre} x {item.cantidad} - ${(item.precio * item.cantidad).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="mb-2"><b>Envío:</b> ${ultimaCompra.envio?.toFixed(2) ?? '0.00'}</div>
            <div className="mb-2"><b>Impuestos:</b> ${ultimaCompra.impuestos?.toFixed(2) ?? '0.00'}</div>
            <div className="font-bold">Total: ${ultimaCompra.total.toFixed(2)}</div>
          </>
        )}
      </div>
    </div>
  )
} 