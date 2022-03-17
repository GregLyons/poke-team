import { StartBox } from "../../../../../hooks/App/Cart";
import { CartTerminalClickHandlers } from "../../CartView";

type StartBoxInTerminalProps = {
  box: StartBox
  clickHandlers: CartTerminalClickHandlers
  hasMore: boolean
}

const StartBoxInTerminal = ({
  box,
  clickHandlers,
  hasMore,
}: StartBoxInTerminalProps) => {
  return (
    <li
      title={box.note}
      className="cart-view-terminal__box-wrapper"
    >
      <div className="cart-view-terminal__box-role">
        {box.roleInCombination}
      </div>
      <div className="cart-view-terminal__box-move-wrapper">
        <button 
          title="Cannot move the starting box up; no preceding box."
          className="cart-view-terminal__arrow-wrapper--disabled"
          disabled
        >
          <div
            className={`
              cart-view-terminal__box-arrow
              cart-view-terminal__box-move-up
              cart-view-terminal__box-move-up--disabled
            `}
          />
        </button>
        <button 
          title="Swap the starting box with the subsequent box."
          className="cart-view-terminal__arrow-wrapper"
          onClick={e => clickHandlers.onMoveDownClick(e, box)}
        >
          <div
            className={`
              cart-view-terminal__box-move-down
              cart-view-terminal__box-arrow
              ${hasMore 
                ? ''
                : 'cart-view-terminal__box-move-down--disabled'
              }
            `}
          />
        </button>
      </div>
      <div className="cart-view-terminal__box-remove-wrapper">
        <button
          title="Remove the starting box from the combination. If there are no boxes, the combination will end. Otherwise, the next box will become the starting box."
          className="cart-view-terminal__box-remove"
          onClick={e => clickHandlers.onRemoveClick(e, box)}
        />
      </div>
      <div className="cart-view-terminal__box-note">
        <span>
          {box.note}
        </span>
      </div>
    </li>
  )
}

export default StartBoxInTerminal;