import { useEffect, useMemo, useRef, useState } from 'react';
import { BoxInCombination, Cart, findBoxInArray } from '../../../../hooks/App/Cart';
import { Dispatches, Filters } from '../../../App';
import { CartTerminalClickHandlers } from '../CartView';
import BoxInTerminal from './BoxInTerminal/BoxInTerminal';
import './BoxInTerminal/BoxInTerminal.css';
import StartBoxInTerminal from './BoxInTerminal/StartBoxInTerminal';
import './CartTerminal.css';
import CartTerminalControls from './CartTerminalControls/CartTerminalControls';

type CartTerminalProps = {
  cart: Cart
  dispatches: Dispatches
  filters: Filters
  clickHandlers: CartTerminalClickHandlers
}

export type CartTerminalControlClickHandlers = {
  onExecute: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onTerminate: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const CartTerminal = ({
  cart,
  dispatches,
  filters,
  clickHandlers,
}: CartTerminalProps) => {
  const defaultMessage = 'Start a combination'
  const [terminalMessage, setTerminalMessage] = useState(defaultMessage);

  const [newName, setNewName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  useEffect(() => {
    if (cart[filters.genFilter.gen].zeroCombinationResult) {
      setSubmitting(false);

      // Blur input
      if (inputRef.current) inputRef.current.blur();

      setTerminalMessage('No results; remove a red box');
    }
  }, [cart, filters]);

  // Focus on input when submitting
  useEffect(() => {
    if (submitting && inputRef.current) inputRef.current.focus();
  }, [submitting]);

  const controlClickHandlers: CartTerminalControlClickHandlers = useMemo(() => {
    const onExecute = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'execute_combination',
        payload: {
          gen: filters.genFilter.gen,
        },
      });

      if (cart[filters.genFilter.gen].combination) {
        setSubmitting(true);
        setTerminalMessage('SUBMIT name for new box');
        setNewName('');
      }
    }

    const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (newName) {
        dispatches.dispatchCart({
          type: 'add_combination_result',
          payload: {
            gen: filters.genFilter.gen,
            note: newName,
          },
        });
        setTerminalMessage(defaultMessage);
        setSubmitting(false);
      };
      setNewName('');
    }
  
    const onTerminate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'clear_combination',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
      setSubmitting(false);
      setNewName('');
      setTerminalMessage('Combination cleared');
      setTimeout(() => setTerminalMessage(defaultMessage), 2000);
    }

    return { onExecute, onSubmit, onTerminate };
  }, [cart, dispatches, filters, newName, setNewName, submitting, setSubmitting, terminalMessage, setTerminalMessage, defaultMessage, ]);

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
        onNameChange={onNameChange}
        newName={newName}
        inputRef={inputRef}
        clickHandlers={controlClickHandlers}
        terminalMessage={terminalMessage}
        submitting={submitting}
      />
    </div>
  );
}

export default CartTerminal;