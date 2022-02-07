import { useMemo, useState } from "react";
import { Cart, TargetEntityInCart } from "../../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../../App";
import Accordion from "../../../../Reusables/Accordion/Accordion";
import Box from "./Box";
import BoxAccordionTitle from "./BoxAccordionTitle";

import './BoxAccordion.css';
import { PokemonIconDatum } from "../../../../../types-queries/helpers";

type BoxAccordionProps = {
  cart: Cart
  targetEntityInCart: TargetEntityInCart,
  dispatches: PokemonIconDispatches,
  filters: PokemonIconFilters,

  comboStart: string | undefined
  toggleCombo: (key: string, value: PokemonIconDatum[]) => void
}

const BoxAccordion = ({
  cart,
  targetEntityInCart,
  dispatches,
  filters,
  comboStart,
  toggleCombo,
}: BoxAccordionProps) => {

  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const boxes = Object.entries(targetEntityInCart);
    return boxes.map(([key, value]) => {
      const onComboClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        toggleCombo(key, value);
      };

      return {
        title: <BoxAccordionTitle
          cart={cart}
          onComboClick={onComboClick}
          comboHasStarted={comboStart !== undefined}
          startedCombo={comboStart !== undefined && comboStart === key}
          filters={filters}
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
  }, [cart, targetEntityInCart, dispatches, filters, comboStart, toggleCombo]);

  return (
    <Accordion
      entireTitleClickable={false}
      accordionContext="boxes"
      accordionData={accordionData}
    />  
  )
}

export default BoxAccordion;