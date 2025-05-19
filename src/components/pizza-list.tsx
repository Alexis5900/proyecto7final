"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card"
import { useCart } from "../context/cart-provider"
import { pizzaData } from "../data/pizza-data"
import { useToast } from "../hooks/use-toast"

export function PizzaList() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleAddToCart = (pizza: any) => {
    addToCart(pizza)
    toast({
      title: "Añadido al carrito",
      description: `${pizza.name} ha sido añadido a tu carrito`,
      duration: 3000,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pizzaData.map((pizza) => (
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
            <Button onClick={() => handleAddToCart(pizza)} className="w-full bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" /> Añadir al Carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
