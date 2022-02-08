import { useMemo } from "react";
import { BGManager, classWithBG, classWithBGShadow } from "../../../hooks/App/BGManager";
import { Box, BoxInCombination, Cart } from "../../../hooks/App/Cart";
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

export type CartAccordionClickHandlers = {
  onComboClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => void
  onAndClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => void
  onOrClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => void
}

export type CartTerminalClickHandlers = {
  onToggleOperationClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => void
  onMoveUpClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => void
  onMoveDownClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => void
}

const CartView = ({
  bgManager,
  cart,
  dispatches,
  filters,
}: CartViewProps) => {
  
  const cartAccordionClickHandlers: CartAccordionClickHandlers = useMemo(() => {
    // Clicks in the CartAccordion
    // #region

    const onComboClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => {
      dispatches.dispatchCart({
        type: 'toggle_combo_start',
        payload: {
          gen: filters.genFilter.gen,
          box: box,
        }
      });
    };
  
    const onAndClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => {
      dispatches.dispatchCart({
        type: 'toggle_in_combo',
        payload: {
          gen: filters.genFilter.gen,
          boxWithOperation: {
            operation: 'AND',
            box,
          }
        }
      })
    };
  
    const onOrClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: Box) => {
      dispatches.dispatchCart({
        type: 'toggle_in_combo',
        payload: {
          gen: filters.genFilter.gen,
          boxWithOperation: {
            operation: 'OR',
            box,
          }
        }
      })
    };

    // #endregion

    return { onComboClick, onAndClick, onOrClick, };
  }, [dispatches]);

  const cartTerminalClickHandlers: CartTerminalClickHandlers = useMemo(() => {
    const onToggleOperationClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => {
      dispatches.dispatchCart({
        type: 'toggle_in_combo',
        payload: {
          gen: filters.genFilter.gen,
          boxWithOperation: {
            operation: boxInCombination.operation === 'AND'
              ? 'OR' 
              : 'AND',
            box: boxInCombination.box,
          }
        }
      })
    };
  
    const onMoveUpClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => {
      dispatches.dispatchCart({
        type: 'move_box_up_one',
        payload: {
          gen: filters.genFilter.gen,
          boxInCombination,
        }
      });
    };
  
    const onMoveDownClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => {
      dispatches.dispatchCart({
        type: 'move_box_down_one',
        payload: {
          gen: filters.genFilter.gen,
          boxInCombination,
        }
      });
    };

    return { onToggleOperationClick, onMoveUpClick, onMoveDownClick, };
  }, [dispatches]);

  return (
    <div className={classWithBG("cart-view__wrapper", bgManager)}>
      <div className={classWithBGShadow("cart-view-accordion__cell", bgManager)}>
        <CartAccordion
          cart={cart}
          dispatches={dispatches}
          filters={filters}
          clickHandlers={cartAccordionClickHandlers}
        />
      </div>
      <div className={classWithBGShadow("cart-view-terminal__cell", bgManager)}>
        <CartTerminal
          cart={cart}
          dispatches={dispatches}
          filters={filters}
          clickHandlers={cartTerminalClickHandlers}
        />
      </div>
    </div>
  )
}

export default CartView;