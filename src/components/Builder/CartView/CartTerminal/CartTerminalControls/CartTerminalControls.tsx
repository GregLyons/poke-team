import { useState } from 'react';
import { Dispatches, Filters } from '../../../../App';
import { CartTerminalControlClickHandlers } from '../CartTerminal';
import './CartTerminalControls.css';

type CartTerminalControlsProps = {
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newName: string
  inputRef: React.RefObject<HTMLInputElement>
  clickHandlers: CartTerminalControlClickHandlers
  terminalMessage: string
  submitting: boolean
}

const CartTerminalControls = ({
  onNameChange,
  newName,
  inputRef,
  clickHandlers,
  terminalMessage,
  submitting,
}: CartTerminalControlsProps) => {
  return (
    <div className="cart-view-terminal__controls-wrapper">
      <div className="cart-view-terminal__message">
        {terminalMessage}
      </div>
      <div
        role="button" 
        className="cart-view-terminal__execute"
        onClick={clickHandlers.onExecute}
      >
        COMBO
      </div>
      <div
        role="button"
        className="cart-view-terminal__terminate"
        onClick={clickHandlers.onTerminate}
      >
        BREAK
      </div>
      <div 
        className={`
        cart-view-terminal__input-wrapper
        ${!submitting
          ? 'cart-view-terminal__input-wrapper--disabled'
          : 'cart-view-terminal__input-wrapper--enabled'
        }
      `}
      >
        <input
          ref={inputRef}
          value={newName}
          type="text"
          className={`
            cart-view-terminal__input
            ${!submitting
              ? 'cart-view-terminal__input--disabled'
              : 'cart-view-terminal__input--enabled'
            }
          `}
          onChange={onNameChange}
          placeholder="Input box name"
          disabled={!submitting}
        />
      </div>
      <div
        role="button"
        className={`
          cart-view-terminal__submit
          ${!submitting
            ? 'cart-view-terminal__submit--disabled'
            : 'cart-view-terminal__submit--enabled'
          }
        `}
        onClick={e => submitting && clickHandlers.onSubmit(e)}
      >
        SUBMIT
      </div>
    </div>
  )
}

export default CartTerminalControls;