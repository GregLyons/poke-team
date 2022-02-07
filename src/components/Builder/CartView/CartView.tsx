import { BGManager, classWithBG, classWithBGShadow } from "../../../hooks/App/BGManager";
import { Cart } from "../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import CartAccordion from "./CartAccordion/CartAccordion";
import CartTerminal from "./CartTerminal/CartTerminal";

import './CartView.css';

type CartViewProps = {
  bgManager: BGManager
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const CartView = ({
  bgManager,
  cart,
  dispatches,
  filters,
}: CartViewProps) => {
  return (
    <div className={classWithBG("cart-view__wrapper", bgManager)}>
      <div className={classWithBGShadow("cart-view-accordion__cell", bgManager)}>
        <CartAccordion
          cart={cart}
          dispatches={dispatches}
          filters={filters}
        />
      </div>
      <div className={classWithBGShadow("cart-view-terminal__cell", bgManager)}>
        <CartTerminal

        />
      </div>
    </div>
  )
}

export default CartView;