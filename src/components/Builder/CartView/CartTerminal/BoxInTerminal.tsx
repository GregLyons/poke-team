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
      {box.note}
      {box.roleInCombination}
      <button
        onClick={e => clickHandlers.onMoveUpClick(e, box)}
      >Move up</button>
      <button
        onClick={e => clickHandlers.onMoveDownClick(e, box)}
        disabled={last}
      >Move down</button>
      <button
        onClick={e => clickHandlers.onToggleOperationClick(e, box)}
      >Toggle op</button>
    </div>
  )
}

export default BoxInTerminal;