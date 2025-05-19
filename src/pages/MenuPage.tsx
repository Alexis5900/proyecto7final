import PizzaList from "../components/PizzaList"

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestro Menú de Pizzas</h1>
      <PizzaList />
    </div>
  )
}
