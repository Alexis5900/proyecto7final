import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import FeaturedPizzas from "../components/FeaturedPizzas"

export default function HomePage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-red-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pizzas Molina - Las Mejores Pizzas a Domicilio
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Deliciosas pizzas artesanales hechas con ingredientes frescos y entregadas directamente a tu puerta.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/menu">
                <Button className="bg-red-600 hover:bg-red-700">Ver Menú</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FeaturedPizzas />
    </>
  )
}
