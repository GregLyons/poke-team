import { StartBox } from "../../../../hooks/App/Cart";
import { CartTerminalClickHandlers } from "../CartView";

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
    <div className="cart-view-terminal__box-wrapper">
      <div className="cart-view-terminal__box-role">
        {box.roleInCombination}
      </div>
      <div className="cart-view-terminal__box-move-wrapper">
        <div className="cart-view-terminal__arrow-wrapper--disabled">
          <div
            role="button"
            className={`
              cart-view-terminal__box-move-up
              cart-view-terminal__box-move-up--disabled
            `}
          />
        </div>
        <div 
          className="cart-view-terminal__arrow-wrapper"
          onClick={e => clickHandlers.onMoveDownClick(e, box)}
        >
          <div
            role="button"
            className={`
              cart-view-terminal__box-move-down
              ${hasMore 
                ? ''
                : 'cart-view-terminal__box-move-down--disabled'
              }
            `}
          />
        </div>
      </div>
      <div className="cart-view-terminal__box-remove-wrapper">
        <div
          role="button"
          className="cart-view-terminal__box-remove"
          onClick={e => clickHandlers.onRemoveClick(e, box)}
        />
      </div>
      <div className="cart-view-terminal__box-note">{box.note}</div>
    </div>
  )
}

export default StartBoxInTerminal;