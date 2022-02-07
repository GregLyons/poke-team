import { useState } from "react";
import { toggleBGPulse } from "../../../../../hooks/App/BGManager";
import { Cart } from "../../../../../hooks/App/Cart";
import { GenFilter } from "../../../../../hooks/App/GenFilter";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../../App";
import Button from "../../../../Reusables/Button/Button";

type BoxAccordionTitleProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: {
    genFilter: GenFilter
  }
  titleText: string
  comboHasStarted: boolean
  startedCombo: boolean
  onComboClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const BoxAccordionTitle = ({
  cart,
  filters: {
    genFilter,
  },
  dispatches,
  titleText,

  comboHasStarted,
  startedCombo,
  onComboClick,
}: BoxAccordionTitleProps) => {
  const [mode, setMode] = useState<'OR' | 'AND' | undefined>(undefined);

  const toggleOr = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    mode !== 'OR'
      ? setMode('OR')
      : setMode(undefined);
  }

  const toggleAnd = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    mode !== 'AND'
      ? setMode('AND')
      : setMode(undefined);
  }

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

          active={startedCombo}
          onClick={onComboClick}
          disabled={comboHasStarted && !startedCombo}
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