import { BoxInCombination } from "../../../../../hooks/App/Cart";
import { CartTerminalClickHandlers } from "../../CartView";

type BoxInTerminalProps = {
  box: BoxInCombination
  clickHandlers: CartTerminalClickHandlers
  breaking: boolean
  last: boolean
}

const BoxInTerminal = ({
  box,
  clickHandlers,
  breaking,
  last,
}: BoxInTerminalProps) => {
  return (
    <li
      title={box.note}
      className={`
        cart-view-terminal__box-wrapper
        ${breaking 
          ? 'cart-view-terminal__box-wrapper--breaking'
          : ''
        }
      `}
    >
      <button className={`
        cart-view-terminal__box-role--${box.roleInCombination === 'AND' ? 'and' : 'or'}
        cart-view-terminal__box-role-toggleable
      `}
        onClick={e => clickHandlers.onToggleOperationClick(e, box)}
      >
        {box.roleInCombination}
      </button>
      <div className="cart-view-terminal__box-move-wrapper">
        <button 
          title="Swap this box with the preceding box."
          className="cart-view-terminal__arrow-wrapper"
          onClick={e => clickHandlers.onMoveUpClick(e, box)}
        >
          <div
            className={`
              cart-view-terminal__box-move-up
              cart-view-terminal__box-arrow
            `}
          />
        </button>
        <button
          title={last
            ? "Cannot move the last box down; no subsequent box."
            : "Swap this box with the subsequent box."  
          }
          className={last 
            ? 'cart-view-terminal__arrow-wrapper--disabled'
            : 'cart-view-terminal__arrow-wrapper'
          }
          onClick={e => {
            if (!last) clickHandlers.onMoveDownClick(e, box)
          }}
          disabled={last}
        >
          <div
            className={`
              cart-view-terminal__box-move-down
              cart-view-terminal__box-arrow
              ${last
                ? 'cart-view-terminal__box-move-down--disabled'
                : ''
              }
            `}
          />
        </button>
      </div>
      <div className="cart-view-terminal__box-remove-wrapper">
        <button
          title="Remove this box from the combination."
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

export default BoxInTerminal;