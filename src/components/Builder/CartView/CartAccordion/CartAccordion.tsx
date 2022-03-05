import { Cart, } from "../../../../hooks/App/Cart";
import { Dispatches, Filters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import ParentEntityAccordionTitle from "./ParentEntityAccordionTitle";
import TargetEntityAccordion from "./TargetEntityAccordion";

import './CartAccordion.css';
import { CartAccordionClickHandlers } from "../CartView";
import { useMemo, } from "react";
import BoxAccordion from "./BoxAccordion/BoxAccordion";
import { Team } from "../../../../hooks/App/Team";

type CartAccordionProps = {
  cart: Cart
  team: Team
  filters: Filters
  clickHandlers: CartAccordionClickHandlers
}

const CartAccordion = ({
  cart,
  team,
  filters,
  clickHandlers
}: CartAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const parentEntitiesInCart = Object.entries(cart[filters.genFilter.gen].pokemon);

    const parentEntityData = parentEntitiesInCart.map(([parentEntityClass, value]) => {
      return {
        title: <ParentEntityAccordionTitle 
          titleText={parentEntityClass}
        />,
        content: <TargetEntityAccordion
          cart={cart}
          team={team}
          clickHandlers={clickHandlers}
          parentEntityInCart={value}
          filters={filters}
        />
      }
    });

    const customBoxAccordionData = {
      title: <ParentEntityAccordionTitle
        titleText={'Custom'}
      />,
      content: <BoxAccordion
        cart={cart}
        team={team}
        targetEntityInCart={cart[filters.genFilter.gen].customBoxes}
        filters={filters}
        clickHandlers={clickHandlers}
      />
    };

    return [...parentEntityData, customBoxAccordionData];
  }, [cart, team, filters, clickHandlers, ]);

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