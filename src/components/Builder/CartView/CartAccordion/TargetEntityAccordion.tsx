import { useMemo } from "react";
import { Cart, ParentEntityInCart, TargetEntityClass } from "../../../../hooks/App/Cart";
import { Team } from "../../../../hooks/App/Team";
import { PokemonIconDatum } from "../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import { CartAccordionClickHandlers, } from "../CartView";
import BoxAccordion from "./BoxAccordion/BoxAccordion";
import TargetEntityAccordionTitle from "./TargetEntityAccordionTitle";


type TargetEntityAccordionProps = {
  cart: Cart
  team: Team
  parentEntityInCart: ParentEntityInCart,
  dispatches: Dispatches,
  filters: Filters,

  clickHandlers: CartAccordionClickHandlers
}

const TargetEntityAccordion = ({
  cart,
  team,
  parentEntityInCart,
  dispatches,
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
          dispatches={dispatches}
          filters={filters}
        />
      }
    });
  }, [cart, team, filters, clickHandlers, dispatches, ]);

  return (
    <Accordion
      accordionContext="target-entity"
      accordionData={accordionData}
    />
  );
}

export default TargetEntityAccordion;