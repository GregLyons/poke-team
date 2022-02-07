import { useState } from "react";
import { toggleBGPulse } from "../../../../../hooks/App/BGManager";
import { Cart } from "../../../../../hooks/App/Cart";
import { PokemonIconDispatches } from "../../../../App";
import Button from "../../../../Reusables/Button/Button";

type BoxAccordionTitleProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  titleText: string
}

const BoxAccordionTitle = ({
  cart,
  dispatches,
  titleText,
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
          title="Combine this box with other boxes using the 'AND' operation."
          label='AND'

          active={mode === 'AND'}
          onClick={toggleAnd}
          disabled={false}
          immediate={false}
        />
        <Button
          title="Combine this box with other boxes using the 'OR' operation."
          label='OR'

          active={mode === 'OR'}
          onClick={toggleOr}
          disabled={false}
          immediate={false}
        />
      </div>
    </>
  );
};

export default BoxAccordionTitle;