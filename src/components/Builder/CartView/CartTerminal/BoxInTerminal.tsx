import { BoxInCombination, StartBox } from "../../../../hooks/App/Cart";
import { CartTerminalClickHandlers } from "../CartView";

type BoxInTerminalProps = {
  box: BoxInCombination
  clickHandlers: CartTerminalClickHandlers
  last: boolean
}

const BoxInTerminal = ({
  box,
  clickHandlers,
  last,
}: BoxInTerminalProps) => {
  return (
    <div className="cart-view-terminal__box-wrapper">
      <div className={`
        cart-view-terminal__box-role--${box.roleInCombination === 'AND' ? 'and' : 'or'}
        cart-view-terminal__box-role-toggleable
      `}
        onClick={e => clickHandlers.onToggleOperationClick(e, box)}
      >
        {box.roleInCombination}
      </div>
      <div className="cart-view-terminal__box-move-wrapper">
        <div 
          className="cart-view-terminal__arrow-wrapper"
          onClick={e => clickHandlers.onMoveUpClick(e, box)}
        >
          <div
            role="button"
            className="cart-view-terminal__box-move-up"
          />
        </div>
        <div 
          className={last 
            ? 'cart-view-terminal__arrow-wrapper--disabled'
            : 'cart-view-terminal__arrow-wrapper'
          }
          onClick={e => {
            if (!last) clickHandlers.onMoveDownClick(e, box)
          }}
        >
          <div
            role="button"
            className={`
              cart-view-terminal__box-move-down
              ${last
                ? 'cart-view-terminal__box-move-down--disabled'
                : ''
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

export default BoxInTerminal;