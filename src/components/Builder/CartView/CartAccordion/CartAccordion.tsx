import { useMemo, useState } from "react";
import { Cart, } from "../../../../hooks/App/Cart";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import ParentEntityAccordionTitle from "./ParentEntityAccordionTitle";
import TargetEntityAccordion from "./TargetEntityAccordion";

import './CartAccordion.css';
import { PokemonIconDatum } from "../../../../types-queries/helpers";

type CartAccordionProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const CartAccordion = ({
  cart,
  dispatches,
  filters,
}: CartAccordionProps) => {
  const [comboStart, setComboStart] = useState<string | undefined>();

  console.log(cart[filters.genFilter.gen].combination);

  const toggleCombo = (key: string, value: PokemonIconDatum[]) => {
    // If key already starts the combo, end the combo
    if (cart[filters.genFilter.gen].combination?.note === key) setComboStart(undefined);
    // Otherwise, start the combo with the key
    else setComboStart(key);

    dispatches.dispatchCart({
      type: 'start_combo',
      payload: {
        gen: filters.genFilter.gen,
        box: {
          note: key,
          pokemon: value,
        }
      }
    });
  }


  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const parentEntitiesInCart = Object.entries(cart[filters.genFilter.gen].pokemon);
    return parentEntitiesInCart.map(([key, value]) => {
      return {
        title: <ParentEntityAccordionTitle 
          titleText={key}
        />,
        content: <TargetEntityAccordion
          cart={cart}
          comboStart={comboStart}
          toggleCombo={toggleCombo}
          parentEntityInCart={value}
          dispatches={dispatches}
          filters={filters}
        />
      }
    })
  }, [cart, dispatches, filters, comboStart, toggleCombo]);
  return (
    <div className="cart-view-accordion__wrapper">
      <Accordion
        accordionContext="cart-view"
        accordionData={accordionData}
      />
    </div>
  );
}

export default CartAccordion;