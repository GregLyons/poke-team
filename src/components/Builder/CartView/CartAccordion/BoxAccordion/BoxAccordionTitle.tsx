import { useState } from "react";
import { toggleBGPulse } from "../../../../../hooks/App/BGManager";
import { Box, BoxInCart, Cart } from "../../../../../hooks/App/Cart";
import { GenFilter } from "../../../../../hooks/App/GenFilter";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../../App";
import Button from "../../../../Reusables/Button/Button";
import { CartAccordionClickHandlers, } from "../../CartView";

type BoxAccordionTitleProps = {
  cart: Cart
  box: BoxInCart

  dispatches: PokemonIconDispatches
  filters: {
    genFilter: GenFilter
  }
  titleText: string

  clickHandlers: CartAccordionClickHandlers
}

const BoxAccordionTitle = ({
  cart,
  box,

  filters: {
    genFilter,
  },
  dispatches,
  titleText,

  clickHandlers,
}: BoxAccordionTitleProps) => {
  return (
    <>
      <div
        className="box-title__text"
      >
        {titleText}
      </div>
      <div className="box-title__buttons">
        <Button
          title='Rename this box.'
          label='EDIT'

          active={true}
          onClick={e => {
            e.preventDefault();
          }}
          disabled={false}
          immediate={false}
        />
        <Button
          title='Pin this box for access in the Team page.'
          label='PIN'

          active={true}
          onClick={e => {
            e.preventDefault();

            toggleBGPulse(dispatches.dispatchBGManager);

            // TODO: PIN
          }}
          disabled={false}
          immediate={true}
        />
        <Button
          title="Start combining this box with other boxes."
          label='COMBO'

          active={}
          onClick={e => clickHandlers.onComboClick(e, box)}
          disabled={}
          immediate={false}
        /> 
        <Button
          title="Combine this box with other boxes using the 'AND' operation."
          label='AND'

          active={mode === 'AND'}
          onClick={toggleAnd}
          disabled={cart[genFilter.gen].combination === null || startedCombo}
          immediate={false}
        />
        <Button
          title="Combine this box with other boxes using the 'OR' operation."
          label='OR'

          active={mode === 'OR'}
          onClick={toggleOr}
          disabled={cart[genFilter.gen].combination === null || startedCombo}
          immediate={false}
        />
      </div>
    </>
  );
};

export default BoxAccordionTitle;