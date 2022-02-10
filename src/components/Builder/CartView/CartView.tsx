import { Key, useMemo, useState } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { BoxInCart, BoxInCombination, Cart, CartInGen, ParentEntityClass, StartBox, TargetEntityClass, } from "../../../hooks/App/Cart";
import { Team } from "../../../hooks/App/Team";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import CartAccordion from "./CartAccordion/CartAccordion";
import CartTerminal from "./CartTerminal/CartTerminal";

import './CartView.css';

type CartViewProps = {
  bgManager: BGManager
  team: Team
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

// Type definitions for click handlers
// #region

export type CartAccordionClickHandlers = {
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
  bgManager,
  cart,
  team,
  dispatches,
  filters,
}: CartViewProps) => {
  const cartAccordionClickHandlers: CartAccordionClickHandlers = useMemo(() => {
    const onPinClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, box: BoxInCart) => {
      e.preventDefault();
      dispatches.dispatchTeam({
        type: 'pin_box',
        payload: {
          gen: filters.genFilter.gen,
          box,
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

    return { onPinClick, onUnpinClick, onComboClick, onAndClick, onOrClick, };
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
    <div className={classWithBG("cart-view__wrapper", bgManager)}>
      <div className={classWithBGShadow("cart-view-accordion__cell", bgManager)}>
        <CartAccordion
          cart={cart}
          team={team}
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