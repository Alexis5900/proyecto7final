import { useEffect, useRef, useState } from "react"
import { useCart } from "../context/CartContext"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ShoppingCart } from "lucide-react"

type Producto = {
  _id: string
  nombre: string
  precio: number
  imagen: string
  descripcion: string
}

export default function PizzaList() {
  const [productos, setProductos] = useState<Producto[]>([])
  const { addToCart } = useCart()
  const [animating, setAnimating] = useState(false)
  const [animationStyle, setAnimationStyle] = useState<any>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const [error, setError] = useState("")
  const cartIconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/productos")
        const data = await res.json()
        setProductos(data)
      } catch (error) {
        console.error("Error al obtener productos:", error)
      }
    }

    fetchProductos()
  }, [])

  useEffect(() => {
    // Buscar el ícono del carrito en la barra superior
    const cartIcon = document.querySelector("#cart-icon-fly") as HTMLElement
    if (cartIcon && cartIconRef.current !== cartIcon) {
      (cartIconRef as any).current = cartIcon
    }
  }, [])

  const handleAddToCart = (producto: Producto) => {
    setError("")
    try {
      // Obtener posición del ícono del carrito
      const cartIcon = cartIconRef.current
      if (!cartIcon) {
        addToCart(producto)
        return
      }
      const cartRect = cartIcon.getBoundingClientRect()
      // Posición inicial: centro de la pantalla
      const startLeft = window.innerWidth / 2
      const startTop = window.innerHeight / 2 + window.scrollY
      setAnimationStyle({
        left: startLeft,
        top: startTop,
        toLeft: cartRect.left + cartRect.width / 2,
        toTop: cartRect.top + window.scrollY,
        startSize: 96,
        endSize: 32
      })
      setAnimating(true)
      setAnimationKey(prev => prev + 1)
      // Esperar animación y luego agregar al carrito
      setTimeout(() => {
        addToCart(producto)
        setAnimating(false)
      }, 1200)
    } catch (err) {
      setError("Error al agregar al carrito")
    }
  }

  return (
    <>
      {animating && animationStyle && (
        <ShoppingCart
          key={animationKey}
          className="fixed z-50 text-white bg-red-600 rounded-full shadow-lg"
          style={{
            left: animationStyle.left - animationStyle.startSize / 2,
            top: animationStyle.top - animationStyle.startSize / 2,
            width: animationStyle.startSize,
            height: animationStyle.startSize,
            pointerEvents: "none",
            transition: "all 1.2s cubic-bezier(.4,2,.6,1)",
            transform: `translate(${animationStyle.toLeft - animationStyle.left}px, ${animationStyle.toTop - animationStyle.top}px) scale(${animationStyle.endSize / animationStyle.startSize})`
          }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <Card key={producto._id}>
            <CardHeader>
              <CardTitle>{producto.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
              <p>{producto.descripcion}</p>
              <p className="text-gray-700 text-lg font-semibold">${producto.precio}</p>
            </CardContent>
            <CardFooter>
              <div className="relative w-full">
                <Button
                  onClick={() => handleAddToCart(producto)}
                  className="bg-red-600 hover:bg-red-700 w-full"
                  disabled={animating}
                >
                  Agregar al carrito
                </Button>
                {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
