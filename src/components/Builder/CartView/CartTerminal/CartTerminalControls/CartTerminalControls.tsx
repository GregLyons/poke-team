import { PokemonIconDispatches, PokemonIconFilters } from '../../../../App';
import { CartTerminalControlClickHandlers } from '../CartTerminal';
import './CartTerminalControls.css';

type CartTerminalControlsProps = {
  clickHandlers: CartTerminalControlClickHandlers
  terminalMessage: string
}

const CartTerminalControls = ({
  clickHandlers: {
    onExecute,
    onTerminate,
  },
  terminalMessage,
}: CartTerminalControlsProps) => {
  return (
    <div className="cart-view-terminal__controls-wrapper">
      <div className="cart-view-terminal__message">
        {terminalMessage}
      </div>
      <div 
        className="cart-view-terminal__text-bar"
      >
        YOYOYOYOYO
      </div>
      <div
        role="button" 
        className="cart-view-terminal__execute"
        onClick={onExecute}
      >
        COMBO
      </div>
      <div
        role="button"
        className="cart-view-terminal__terminate"
        onClick={onTerminate}
      >
        BREAK
      </div>
    </div>
  )
}

export default CartTerminalControls;