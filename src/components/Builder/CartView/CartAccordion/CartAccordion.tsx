import { useMemo } from "react";
import { Cart, } from "../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import ParentEntityAccordionTitle from "./ParentEntityAccordionTitle";
import TargetEntityAccordion from "./TargetEntityAccordion";

import './CartAccordion.css';

type CartAccordionProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const CartAccordion = ({
  cart,
  dispatches,
  filters,
}: CartAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const parentEntitiesInCart = Object.entries(cart[filters.genFilter.gen].pokemon);
    return parentEntitiesInCart.map(([key, value]) => {
      return {
        title: <ParentEntityAccordionTitle 
          titleText={key}
        />,
        content: <TargetEntityAccordion
          cart={cart}
          parentEntityInCart={value}
          dispatches={dispatches}
          filters={filters}
        />
      }
    })
  }, [cart, dispatches, filters]);
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