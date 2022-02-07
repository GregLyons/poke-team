import { useMemo } from "react";
import { TargetEntityInCart } from "../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import Box from "./Box";
import BoxAccordionTitle from "./BoxAccordionTitle";


type BoxAccordionProps = {
  targetEntityInCart: TargetEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,
}

const BoxAccordion = ({
  targetEntityInCart,
  dispatches,
  filters,
}: BoxAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const boxes = Object.entries(targetEntityInCart);
    return boxes.map(([key, value]) => {
      return {
        title: <BoxAccordionTitle
          titleText={key}
        />,
        content: <Box
          pokemonIconData={value}
          dispatches={dispatches}
          filters={filters}
          key={key}
        />
      };
    })
  }, [targetEntityInCart, dispatches, filters]);

  return (
    <Accordion
      accordionContext="boxes"
      accordionData={accordionData}
    />  
  )
}

export default BoxAccordion;