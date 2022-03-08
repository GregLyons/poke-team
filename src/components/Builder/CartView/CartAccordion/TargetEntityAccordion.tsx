import { useMemo } from "react";
import { Cart, ParentEntityInCart } from "../../../../hooks/App/Cart";
import { Team } from "../../../../hooks/App/Team";
import { Filters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import { CartAccordionClickHandlers } from "../CartView";
import BoxAccordion from "./BoxAccordion/BoxAccordion";
import TargetEntityAccordionTitle from "./TargetEntityAccordionTitle";


type TargetEntityAccordionProps = {
  cart: Cart
  team: Team
  parentEntityInCart: ParentEntityInCart,
  filters: Filters,

  clickHandlers: CartAccordionClickHandlers
}

const TargetEntityAccordion = ({
  cart,
  team,
  parentEntityInCart,
  filters,

  clickHandlers,
}: TargetEntityAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const targetEntitiesInCart = Object.entries(parentEntityInCart);
    return targetEntitiesInCart.map(([targetEntityClass, targetEntityInCart]) => {
      return {
        title: <TargetEntityAccordionTitle
          titleText={targetEntityClass}
        />,
        content: <BoxAccordion
          cart={cart}
          team={team}
          clickHandlers={clickHandlers}
          targetEntityInCart={targetEntityInCart}
          filters={filters}
        />
      }
    });
  }, [cart, team, filters, clickHandlers, ]);

  return (
    <Accordion
      accordionContext="target-entity"
      accordionData={accordionData}
    />
  );
}

export default TargetEntityAccordion;