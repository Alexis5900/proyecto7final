export type Pizza = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export const pizzaData: Pizza[] = [
  {
    id: 1,
    name: "Margarita",
    description: "Salsa de tomate, mozzarella y albahaca fresca",
    price: 7990,
    image: "/img/margarita.jpg"
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Salsa de tomate, mozzarella y pepperoni",
    price: 8990,
    image: "/img/pepperoni.jpg"
  },
  {
    id: 3,
    name: "Cuatro Quesos",
    description: "Mozzarella, parmesano, gorgonzola y queso de cabra",
    price: 9990,
    image: "/img/cuatro-quesos.jpg"
  }
] 