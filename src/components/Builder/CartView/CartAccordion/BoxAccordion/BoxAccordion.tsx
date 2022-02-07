import { useMemo } from "react";
import { Cart, TargetEntityInCart } from "../../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../../App";
import Accordion from "../../../../Reusables/Accordion/Accordion";
import Box from "./Box";
import BoxAccordionTitle from "./BoxAccordionTitle";

import './BoxAccordion.css';

type BoxAccordionProps = {
  cart: Cart
  targetEntityInCart: TargetEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,
}

const BoxAccordion = ({
  cart,
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
          cart={cart}
          dispatches={dispatches}
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
      entireTitleClickable={false}
      accordionContext="boxes"
      accordionData={accordionData}
    />  
  )
}

export default BoxAccordion;