import { Cart, } from '../../../../hooks/App/Cart';
import { PokemonIconDispatches, PokemonIconFilters } from '../../../App';
import { CartTerminalClickHandlers } from '../CartView';
import BoxInTerminal from './BoxInTerminal';
import './CartTerminal.css';
import StartBoxInTerminal from './StartBoxInTerminal';

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
  const currentCombination = cart[filters.genFilter.gen].combination;
  return (
    <div className="cart-view-terminal__wrapper">
      <div className="cart-view-terminal__boxes-wrapper">
        {currentCombination && (
          <>
            <StartBoxInTerminal 
              box={currentCombination[0]}
              clickHandlers={clickHandlers}
              hasMore={currentCombination[1].length !== 0}
            />
            {currentCombination[1].map((box, idx) => {
              console.log(idx);
              console.log(currentCombination[1].length);
              console.log(idx === currentCombination[1].length - 1);
              return (
                <BoxInTerminal
                  box={box}
                  clickHandlers={clickHandlers}
                  last={idx === currentCombination[1].length - 1}
                />
              )
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default CartTerminal;