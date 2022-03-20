import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { CartTerminalControlHandlers } from '../CartTerminal';
import './CartTerminalControls.css';

type CartTerminalControlsProps = {
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newName: string
  inputRef: React.RefObject<HTMLInputElement>
  clickHandlers: CartTerminalControlHandlers
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
  const [focusedOnNameInput, setFocusedOnNameInput] = useState(false);

  // 'Enter' submits name
  const onEnter = (e: KeyboardEvent) => {
    if (!submitting || newName.length === 0 || !focusedOnNameInput) return;
    if (e.code === 'Enter') clickHandlers.onSubmit(e);
  }
  useEventListener('keydown', onEnter);
  return (
    <section aria-labelledby="cart-terminal-controls" className="cart-view-terminal__controls-wrapper">
      <h2 id="cart-terminal-controls" className="hidden-header">Controls for Cart Terminal</h2>
      <p className="cart-view-terminal__message">
        {terminalMessage}
      </p>
      <button
        title="Create a custom box using the above combination."
        className="cart-view-terminal__execute"
        onClick={clickHandlers.onExecute}
      >
        COMBO
      </button>
      <button
        title="Break the combo, removing all boxes from the terminal."
        className="cart-view-terminal__terminate"
        onClick={clickHandlers.onTerminate}
      >
        BREAK
      </button>
      <div
        className={`
        cart-view-terminal__input-wrapper
        ${!submitting
          ? '--disabled'
          : '--enabled'
        }
      `}
      >
        <input
          title={submitting
            ? "Enter name for new box."
            : "Combine two or more boxes before entering name."
          }
          ref={inputRef}
          value={newName}
          type="text"
          className={`
            cart-view-terminal__input
            ${!submitting
              ? '--disabled'
              : '--enabled'
            }
          `}
          onFocus={() => setFocusedOnNameInput(true)}
          onBlur={() => setFocusedOnNameInput(false)}
          onChange={onNameChange}
          placeholder="Input box name"
          disabled={!submitting}
        />
      </div>
      <button
        title={
          submitting
            ? newName.length > 0
              ? "Create new box with the given name."
              : "Box must have a name."
            : "Need to create combination first."
        }
        className={`
          cart-view-terminal__submit
          ${!submitting || newName.length === 0
            ? '--disabled'
            : '--enabled'
          }
        `}
        onClick={clickHandlers.onSubmit}
        disabled={!submitting || newName.length === 0}
      >
        ENTER
      </button>
    </section>
  )
}

export default CartTerminalControls;