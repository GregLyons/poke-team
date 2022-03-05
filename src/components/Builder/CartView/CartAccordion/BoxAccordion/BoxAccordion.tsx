import { useMemo, } from "react";
import { Cart, TargetEntityInCart } from "../../../../../hooks/App/Cart";
import { Dispatches, Filters } from "../../../../App";
import Accordion from "../../../../Reusables/Accordion/Accordion";
import Box from "./Box";
import BoxAccordionTitle from "./BoxAccordionTitle";

import './BoxAccordion.css';
import { CartAccordionClickHandlers } from "../../CartView";
import { Team } from "../../../../../hooks/App/Team";

type BoxAccordionProps = {
  cart: Cart
  team: Team
  targetEntityInCart: TargetEntityInCart,
  filters: Filters,

  clickHandlers: CartAccordionClickHandlers
}

const BoxAccordion = ({
  cart,
  team,
  targetEntityInCart,
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
          pinned={
            Object.keys(team[filters.genFilter.gen].savedPokemon.pinnedBoxes).includes(note)
          }
          
          clickHandlers={clickHandlers}
          filters={filters}
          titleText={note}
        />,
        content: <Box
          box={box}
          filters={filters}
          key={note}
        />
      };
    });
  }, [cart, team, filters, clickHandlers, targetEntityInCart, ]);

  return (
    <Accordion
      optionsInTitle={true}
      accordionContext="boxes"
      accordionData={accordionData}
    />  
  )
}

export default BoxAccordion;