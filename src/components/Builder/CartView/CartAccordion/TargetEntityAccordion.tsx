import { useMemo } from "react";
import { Cart, ParentEntityInCart } from "../../../../hooks/App/Cart";
import { PokemonIconDatum } from "../../../../types-queries/helpers";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import { CartAccordionClickHandlers } from "../CartView";
import BoxAccordion from "./BoxAccordion/BoxAccordion";
import TargetEntityAccordionTitle from "./TargetEntityAccordionTitle";


type TargetEntityAccordionProps = {
  cart: Cart
  parentEntityInCart: ParentEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,

  clickHandlers: CartAccordionClickHandlers
}

const TargetEntityAccordion = ({
  cart,
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
    return targetEntitiesInCart.map(([key, value]) => {
      return {
        title: <TargetEntityAccordionTitle
          titleText={key}
        />,
        content: <BoxAccordion
          cart={cart}
          clickHandlers={clickHandlers}
          targetEntityInCart={value}
          dispatches={dispatches}
          filters={filters}
        />
      }
    })
  }, [cart, parentEntityInCart, dispatches, filters, clickHandlers]);

  return (
    <Accordion
      accordionContext="target-entity"
      accordionData={accordionData}
    />
  );
}

export default TargetEntityAccordion;