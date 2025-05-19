"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "../components/ui/button"
import CartItem from "../components/CartItem"
import { Separator } from "../components/ui/separator"
import { useCart } from "../context/CartContext"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../context/AuthContext"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

export default function CartPage() {
  const { cart, totalPrice } = useCart()
  const { toast } = useToast()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [checkoutAddress, setCheckoutAddress] = useState(user?.address ?? "")
  const [checkoutPhone, setCheckoutPhone] = useState(user?.phone ?? "")
  const [checkoutNotes, setCheckoutNotes] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Debes iniciar sesión",
        description: "Por favor inicia sesión para realizar una compra.",
      })
      navigate("/login", { state: { from: "/cart" } })
      return
    }
    setCheckoutAddress(user?.address ?? "")
    setCheckoutPhone(user?.phone ?? "")
    setShowContactModal(true)
  }

  const confirmCheckout = async () => {
    if (!checkoutAddress.trim() || !checkoutPhone.trim()) {
      toast({
        title: "Faltan datos",
        description: "La dirección y el teléfono son obligatorios.",
      })
      return
    }
    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch('http://localhost:3005/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart, token, direccion: checkoutAddress, telefono: checkoutPhone, notas: checkoutNotes })
      })
      const data = await res.json()
      if (res.ok && data.url) {
        toast({
          title: "Redirigiendo a pago...",
        })
        window.location.href = data.url
      } else {
        toast({
          title: "Error al procesar el pago",
          description: data?.error || "Intenta nuevamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error de red",
        description: "No se pudo conectar con el servidor.",
      })
    } finally {
      setLoading(false)
      setShowContactModal(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" /> Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">Añade algunas deliciosas pizzas para comenzar tu pedido</p>
          <Link to="/menu">
            <Button className="bg-red-600 hover:bg-red-700">Ver Menú</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-4">
              <Link to="/menu" className="flex items-center text-red-600 hover:text-red-800 gap-1">
                <ArrowLeft className="h-4 w-4" /> Continuar comprando
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>$3.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + 3).toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Proceder al Pago"}
            </Button>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirma tus datos de contacto</h2>
            <div className="mb-2">
              <Label htmlFor="checkoutAddress">Dirección</Label>
              <Input id="checkoutAddress" type="text" value={checkoutAddress} onChange={e => setCheckoutAddress(e.target.value)} required />
            </div>
            <div className="mb-2">
              <Label htmlFor="checkoutPhone">Teléfono</Label>
              <Input id="checkoutPhone" type="tel" value={checkoutPhone} onChange={e => setCheckoutPhone(e.target.value)} required />
            </div>
            <div className="mb-2">
              <Label htmlFor="checkoutNotes">Notas para el pedido (opcional)</Label>
              <Input id="checkoutNotes" type="text" value={checkoutNotes} onChange={e => setCheckoutNotes(e.target.value)} />
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1" onClick={confirmCheckout} disabled={loading}>
                {loading ? "Procesando..." : "Confirmar y Pagar"}
              </Button>
              <Button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={() => setShowContactModal(false)} disabled={loading}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
