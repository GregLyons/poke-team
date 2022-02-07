import { useMemo } from "react";
import { ParentEntityInCart } from "../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import Accordion from "../../Reusables/Accordion/Accordion";
import BoxAccordion from "./Boxes/BoxAccordion";
import TargetEntityAccordionTitle from "./TargetEntityAccordionTitle";


type TargetEntityAccordionProps = {
  parentEntityInCart: ParentEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,
}

const TargetEntityAccordion = ({
  parentEntityInCart,
  dispatches,
  filters,
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
          targetEntityInCart={value}
          dispatches={dispatches}
          filters={filters}
        />
      }
    })
  }, [parentEntityInCart, dispatches, filters]);

  return (
    <Accordion
      accordionContext="target-entity"
      accordionData={accordionData}
    />
  );
}

export default TargetEntityAccordion;