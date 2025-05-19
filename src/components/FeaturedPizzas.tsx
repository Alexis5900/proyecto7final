"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card"
import { pizzaData, type Pizza } from "../data/pizza-data"

export default function FeaturedPizzas() {
  const [mounted, setMounted] = useState(false)
  const featuredPizzas = pizzaData.slice(0, 3)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
          {featuredPizzas.map((pizza: Pizza) => (
            <Card key={pizza.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={pizza.image || "/placeholder.svg"}
                  alt={pizza.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{pizza.name}</CardTitle>
                <p className="text-gray-500 text-sm mb-2">{pizza.description}</p>
                <p className="font-bold text-lg">${pizza.price.toFixed(2)}</p>
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
