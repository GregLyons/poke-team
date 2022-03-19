import { BoxInCart, Cart } from "../../../../../hooks/App/Cart";
import { GenFilter } from "../../../../../hooks/App/GenFilter";
import Button from "../../../../Reusables/Button/Button";
import { CartAccordionClickHandlers } from "../../CartView";

type BoxAccordionTitleProps = {
  cart: Cart
  box: BoxInCart
  pinned: boolean

  genFilter: GenFilter
  titleText: string

  clickHandlers: CartAccordionClickHandlers
}

const BoxAccordionTitle = ({
  cart,
  box,
  pinned,

  genFilter,
  titleText,

  clickHandlers,
}: BoxAccordionTitleProps) => {

  return (
    <>
      <h4
        className="box-title__text"
      >
        {titleText}
      </h4>
      <menu className="box-title__buttons">
        <li>
          <Button
            title='Remove this box.'
            label='DEL'

            active={true}
            onClick={e => clickHandlers.onDeleteClick(e, box)}
            disabled={false}
            immediate={true}
          />
        </li>
        <li>
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
            }}
            disabled={false}
            immediate={false}
          />
        </li>
        <li>
          <Button
            title="Start combining this box with other boxes."
            label='COMBO'

            active={box.roleInCombination === 'START'}
            onClick={e => clickHandlers.onComboClick(e, box)}
            // Disabled if combination has started and this box isn't starting it
            disabled={cart[genFilter.gen].combination !== null && box.roleInCombination !== 'START'}
            immediate={false}
          />
        </li>
        <li>
          <Button
            title="Combine this box with other boxes using the 'AND' operation."
            label='AND'

            active={box.roleInCombination === 'AND'}
            onClick={e => clickHandlers.onAndClick(e, box)}
            // Disabled if combination hasn't started, or if this box is starting the combination
            disabled={cart[genFilter.gen].combination === null || box.roleInCombination === 'START'}
            immediate={false}
          />
        </li> 
        <li>
          <Button
            title="Combine this box with other boxes using the 'OR' operation."
            label='OR'

            active={box.roleInCombination === 'OR'}
            onClick={e => clickHandlers.onOrClick(e, box)}
            // Disabled if combination hasn't started, or if this box is starting the combination
            disabled={cart[genFilter.gen].combination === null || box.roleInCombination === 'START'}
            immediate={false}
          />
        </li>
      </menu>
    </>
  );
};

export default BoxAccordionTitle;