import { useMemo, useState } from "react";
import { Cart, TargetEntityInCart } from "../../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../../App";
import Accordion from "../../../../Reusables/Accordion/Accordion";
import Box from "./Box";
import BoxAccordionTitle from "./BoxAccordionTitle";

import './BoxAccordion.css';
import { PokemonIconDatum } from "../../../../../types-queries/helpers";
import { CartAccordionClickHandlers } from "../../CartView";

type BoxAccordionProps = {
  cart: Cart
  targetEntityInCart: TargetEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,

  clickHandlers: CartAccordionClickHandlers
}

const BoxAccordion = ({
  cart,
  targetEntityInCart,
  dispatches,
  filters,

  clickHandlers,
}: BoxAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const boxes = Object.entries(targetEntityInCart);
    return boxes.map(([note, box]) => {
      return {
        title: <BoxAccordionTitle
          cart={cart}
          box={box}
          
          clickHandlers={clickHandlers}
          filters={filters}
          dispatches={dispatches}
          titleText={note}
        />,
        content: <Box
          box={box}
          dispatches={dispatches}
          filters={filters}
          key={note}
        />
      };
    });
  }, [cart, filters, clickHandlers, dispatches, targetEntityInCart, ]);

  return (
    <Accordion
      optionsInTitle={true}
      accordionContext="boxes"
      accordionData={accordionData}
    />  
  )
}

export default BoxAccordion;