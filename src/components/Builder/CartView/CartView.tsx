import { useMemo } from "react";
import { toggleBGPulse } from "../../../hooks/App/BGManager";
import { BoxInCart, BoxInCombination, Cart, StartBox } from "../../../hooks/App/Cart";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import CartAccordion from "./CartAccordion/CartAccordion";
import CartTerminal from "./CartTerminal/CartTerminal";
import './CartView.css';


type CartViewProps = {
  team: Team
  cart: Cart
  dispatches: Dispatches
  filters: Filters
}

// Type definitions for click handlers
// #region

export type CartAccordionClickHandlers = {
  onDeleteClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
  onPinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
  onComboClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
  onAndClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
  onOrClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => void
}

export type CartTerminalClickHandlers = {
  onToggleOperationClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => void
  onMoveUpClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination) => void
  onMoveDownClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination | StartBox) => void
  onRemoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, boxInCombination: BoxInCombination | StartBox) => void
}

// #endregion

const CartView = ({
  cart,
  team,
  dispatches,
  filters,
}: CartViewProps) => {
  const cartAccordionClickHandlers: CartAccordionClickHandlers = useMemo(() => {
    const onDeleteClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'delete',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      })
    };

    const onPinClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchTeam({
        type: 'pin_box',
        payload: {
          gen: filters.genFilter.gen,
          note: box.note,
          pokemon: box.pokemon,
        }
      });

      // Pulse BG
      toggleBGPulse(dispatches.dispatchBGManager);
    };

    const onUnpinClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchTeam({
        type: 'unpin_box',
        payload: {
          gen: filters.genFilter.gen,
          note: box.note,
        }
      });

      // Pulse BG
      toggleBGPulse(dispatches.dispatchBGManager);
    };

    const onComboClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'toggle_combo_start',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      });
    };
  
    const onAndClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'toggle_in_combo_from_cart',
        payload: {
          gen: filters.genFilter.gen,
          box,
          operation: 'AND',
        }
      });
    };
  
    const onOrClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'toggle_in_combo_from_cart',
        payload: {
          gen: filters.genFilter.gen,
          box,
          operation: 'OR',
        }
      })
    };

    return { onDeleteClick, onPinClick, onUnpinClick, onComboClick, onAndClick, onOrClick, };
  }, [dispatches, filters, ]);

  const cartTerminalClickHandlers: CartTerminalClickHandlers = useMemo(() => {
    const onToggleOperationClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCombination) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'toggle_combo_role_from_combo',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      });
    };
  
    const onMoveUpClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCombination) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'move_box_up_one',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      });
    };
  
    const onMoveDownClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: StartBox | BoxInCombination) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'move_box_down_one',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      });
    };

    const onRemoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: StartBox | BoxInCombination) => {
      e.preventDefault();
      dispatches.dispatchCart({
        type: 'remove_from_combo',
        payload: {
          gen: filters.genFilter.gen,
          box,
        }
      })
    };

    return { onToggleOperationClick, onMoveUpClick, onMoveDownClick, onRemoveClick };
  }, [dispatches, filters, ]);

  return (
    <div className={"cart-view__wrapper"}>
      <section aria-labelledby="cart-accordion" className={"cart-view-accordion__cell"}>
        <h2 id="cart-accordion" className="hidden-header">List of boxes from Planner and custom boxes.</h2>
        <ErrorBoundary>
          <CartAccordion
            cart={cart}
            team={team}
            filters={filters}
            clickHandlers={cartAccordionClickHandlers}
          />
        </ErrorBoundary>
      </section>
      <section aria-labelledby="cart-terminal" className={"cart-view-terminal__cell"}>
        <h2 id="cart-terminal" className="hidden-header">Controls for combining boxes.</h2>
        <ErrorBoundary>
          <CartTerminal
            cart={cart}
            dispatches={dispatches}
            filters={filters}
            clickHandlers={cartTerminalClickHandlers}
          />
        </ErrorBoundary>
      </section>
    </div>
  )
}

export default CartView;