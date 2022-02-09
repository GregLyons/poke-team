import { BoxInCombination, Cart, findBoxInArray, } from '../../../../hooks/App/Cart';
import { PokemonIconDispatches, PokemonIconFilters } from '../../../App';
import { CartTerminalClickHandlers } from '../CartView';
import BoxInTerminal from './BoxInTerminal/BoxInTerminal';
import './CartTerminal.css';
import './BoxInTerminal/BoxInTerminal.css';
import CartTerminalControls from './CartTerminalControls/CartTerminalControls';
import StartBoxInTerminal from './BoxInTerminal/StartBoxInTerminal';
import { useEffect, useMemo, useState } from 'react';

type CartTerminalProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  clickHandlers: CartTerminalClickHandlers
}

export type CartTerminalControlClickHandlers = {
  onExecute: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onTerminate: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const CartTerminal = ({
  cart,
  dispatches,
  filters,
  clickHandlers,
}: CartTerminalProps) => {
  const [terminalMessage, setTerminalMessage] = useState('Start a combination');

  useEffect(() => {
    if (cart[filters.genFilter.gen].zeroCombinationResult) setTerminalMessage('No results; remove a red box');
  }, [cart, filters]);

  const controlClickHandlers: CartTerminalControlClickHandlers = useMemo(() => {
    const onExecute = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'execute_combination',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }
  
    const onTerminate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'clear_combination',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
      setTerminalMessage('Combination cleared');
      setTimeout(() => setTerminalMessage('Start a combination'), 2000);
    }

    return { onExecute, onTerminate };
  }, [dispatches, filters]);

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
              return (
                <BoxInTerminal
                  box={box}
                  clickHandlers={clickHandlers}
                  last={idx === currentCombination[1].length - 1}
                  breaking={cart[filters.genFilter.gen].zeroCombinationResult && findBoxInArray((cart[filters.genFilter.gen].zeroCombinationResult as BoxInCombination[]), box)}
                />
              )
            })}
          </>
        )}
      </div>
      <CartTerminalControls
        clickHandlers={controlClickHandlers}
        terminalMessage={terminalMessage}
      />
    </div>
  );
}

export default CartTerminal;