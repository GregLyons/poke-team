import { useMemo, useState } from "react";
import { Box, findBoxInCombination, Cart, Combination, BoxInCombination, } from "../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import ParentEntityAccordionTitle from "./ParentEntityAccordionTitle";
import TargetEntityAccordion from "./TargetEntityAccordion";

import './CartAccordion.css';
import { PokemonIconDatum } from "../../../../types-queries/helpers";
import { CartAccordionClickHandlers } from "../CartView";
import { EntityClass } from "../../../../utils/constants";

type CartAccordionProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  clickHandlers: CartAccordionClickHandlers
}

const CartAccordion = ({
  cart,
  dispatches,
  filters,
  clickHandlers,
}: CartAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const parentEntitiesInCart = Object.entries(cart[filters.genFilter.gen].pokemon);
    return parentEntitiesInCart.map(([key, value]) => {
      const parentEntityClass = (key as EntityClass);

      return {
        title: <ParentEntityAccordionTitle 
          titleText={key}
        />,
        content: <TargetEntityAccordion
          cart={cart}
          clickHandlers={clickHandlers}
          parentEntityInCart={value}
          dispatches={dispatches}
          filters={filters}
        />
      }
    })
  }, [cart, dispatches, filters, clickHandlers]);
  return (
    <div className="cart-view-accordion__wrapper">
      <Accordion
        accordionContext="cart-view"
        accordionData={accordionData}
      />
    </div>
  );
}

export default CartAccordion;