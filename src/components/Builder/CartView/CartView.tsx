import { Cart } from "../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";

type CartViewProps ={
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const CartView = ({
  cart,
  dispatches,
  filters,
}: CartViewProps) => {
  return (
    <div className="cart-view__wrapper">
      yo
    </div>
  )
}

export default CartView;