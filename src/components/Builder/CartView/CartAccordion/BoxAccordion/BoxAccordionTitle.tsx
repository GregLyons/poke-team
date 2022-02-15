import { useState } from "react";
import { toggleBGPulse } from "../../../../../hooks/App/BGManager";
import { BoxInCart, Cart } from "../../../../../hooks/App/Cart";
import { GenFilter } from "../../../../../hooks/App/GenFilter";
import { Dispatches, } from "../../../../App";
import Button from "../../../../Reusables/Button/Button";
import { CartAccordionClickHandlers, } from "../../CartView";

type BoxAccordionTitleProps = {
  cart: Cart
  box: BoxInCart
  pinned: boolean

  dispatches: Dispatches
  filters: {
    genFilter: GenFilter
  }
  titleText: string

  clickHandlers: CartAccordionClickHandlers
}

const BoxAccordionTitle = ({
  cart,
  box,
  pinned: initialPinned,

  filters: {
    genFilter,
  },
  dispatches,
  titleText,

  clickHandlers,
}: BoxAccordionTitleProps) => {
  const [pinned, setPinned] = useState(initialPinned);

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
          title={pinned
            ? 'Un-pin this box from the Team page.'
            : `Pin this box for access in the Team page.`
          }
          label="PIN"

          active={pinned}
          onClick={e => {
            pinned 
              ? clickHandlers.onUnpinClick(e, box)
              : clickHandlers.onPinClick(e, box);
            setPinned(!pinned);
          }}
          disabled={false}
          immediate={false}
        />
        <Button
          title="Start combining this box with other boxes."
          label='COMBO'

          active={box.roleInCombination === 'START'}
          onClick={e => clickHandlers.onComboClick(e, box)}
          // Disabled if combination has started and this box isn't starting it
          disabled={cart[genFilter.gen].combination !== null && box.roleInCombination !== 'START'}
          immediate={false}
        /> 
        <Button
          title="Combine this box with other boxes using the 'AND' operation."
          label='AND'

          active={box.roleInCombination === 'AND'}
          onClick={e => clickHandlers.onAndClick(e, box)}
          // Disabled if combination hasn't started, or if this box is starting the combination
          disabled={cart[genFilter.gen].combination === null || box.roleInCombination === 'START'}
          immediate={false}
        />
        <Button
          title="Combine this box with other boxes using the 'OR' operation."
          label='OR'

          active={box.roleInCombination === 'OR'}
          onClick={e => clickHandlers.onOrClick(e, box)}
          // Disabled if combination hasn't started, or if this box is starting the combination
          disabled={cart[genFilter.gen].combination === null || box.roleInCombination === 'START'}
          immediate={false}
        />
      </div>
    </>
  );
};

export default BoxAccordionTitle;