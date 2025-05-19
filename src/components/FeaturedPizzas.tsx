"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card"

type Producto = {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
}

export default function FeaturedPizzas() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/productos`)
        const data = await res.json()
        setProductos(data.slice(0, 3)) // Solo los primeros 3
      } catch (err) {
        setError("No se pudieron cargar las pizzas destacadas.")
      } finally {
        setLoading(false)
      }
    }
    fetchProductos()
  }, [])

  if (loading) return <div className="text-center py-8">Cargando pizzas destacadas...</div>
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nuestras Pizzas Destacadas</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Prueba nuestras pizzas más populares, preparadas con ingredientes frescos y de alta calidad.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {productos.map((pizza) => (
            <Card key={pizza._id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={pizza.imagen || "/placeholder.svg"}
                  alt={pizza.nombre}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{pizza.nombre}</CardTitle>
                <p className="text-gray-500 text-sm mb-2">{pizza.descripcion}</p>
                <p className="font-bold text-lg">${pizza.precio.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link to="/menu" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Ver en Menú</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/menu">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Ver Todo el Menú
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
