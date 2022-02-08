import { Cart } from '../../../../hooks/App/Cart';
import { PokemonIconDispatches, PokemonIconFilters } from '../../../App';
import { CartTerminalClickHandlers } from '../CartView';
import './CartTerminal.css';

type CartTerminalProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  clickHandlers: CartTerminalClickHandlers
}

const CartTerminal = ({
  cart,
  dispatches,
  filters,
  clickHandlers,
}: CartTerminalProps) => {
  return (
    <div className="cart-view-terminal__wrapper">
      yoyo yo oyo oYO YO OYO OYO YO YOO YO OY ymyoymoy om o yo yoy oymoymoymoymyo lorem ipsum
    </div>
  );
}

export default CartTerminal;