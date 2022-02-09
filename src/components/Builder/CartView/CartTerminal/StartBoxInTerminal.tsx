import { BoxInCombination, StartBox } from "../../../../hooks/App/Cart";
import { CartTerminalClickHandlers } from "../CartView";

type StartBoxInTerminalProps = {
  box: StartBox
  clickHandlers: CartTerminalClickHandlers
}

const StartBoxInTerminal = ({
  box,
  clickHandlers,
}: StartBoxInTerminalProps) => {
  return (
    <div className="cart-view-terminal__box-wrapper">
      {box.note}
      {box.roleInCombination}
      <button
        onClick={e => clickHandlers.onMoveDownClick(e, box)}
      >Move down</button>
    </div>
  )
}

export default StartBoxInTerminal;