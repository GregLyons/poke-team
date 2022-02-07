import { Cart } from "../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import CartAccordion from "./CartAccordion";

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
      <CartAccordion
        cart={cart}
        dispatches={dispatches}
        filters={filters}
      />
    </div>
  )
}

export default CartView;