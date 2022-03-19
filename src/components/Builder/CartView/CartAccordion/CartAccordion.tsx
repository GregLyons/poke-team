import { useMemo } from "react";
import { Cart } from "../../../../hooks/App/Cart";
import { Team } from "../../../../hooks/App/Team";
import { Filters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import { CartAccordionClickHandlers } from "../CartView";
import BoxAccordion from "./BoxAccordion/BoxAccordion";
import './CartAccordion.css';
import ParentEntityAccordionTitle from "./ParentEntityAccordionTitle";
import TargetEntityAccordion from "./TargetEntityAccordion";


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

    const parentEntityData = parentEntitiesInCart.map(([parentEntityClass, parentEntityInCart]) => {
      return {
        title: <ParentEntityAccordionTitle 
          titleText={parentEntityClass}
        />,
        content: Object.values(parentEntityInCart).filter(targetEntityInCart => Object.keys(targetEntityInCart).length > 0).length > 0
          ? <TargetEntityAccordion
              cart={cart}
              team={team}
              clickHandlers={clickHandlers}
              parentEntityInCart={parentEntityInCart}
              filters={filters}
            />
          : false as false,
      }
    });

    const customBoxAccordionData = {
      title: <ParentEntityAccordionTitle
        titleText={'Custom'}
      />,
      content: Object.keys(cart[filters.genFilter.gen].customBoxes).length > 0
        ? <BoxAccordion
            cart={cart}
            team={team}
            targetEntityInCart={cart[filters.genFilter.gen].customBoxes}
            filters={filters}
            clickHandlers={clickHandlers}
          />
        : false as false
    };

    return [...parentEntityData, customBoxAccordionData];
  }, [cart, team, filters, clickHandlers, ]);

  return (
    <div className="cart-view-accordion__wrapper">
      {accordionData.filter(d => d.content !== false).length > 0 && <Accordion
        accordionContext="cart-view"
        accordionData={accordionData}
      />}
    </div>
  );
}

export default CartAccordion;