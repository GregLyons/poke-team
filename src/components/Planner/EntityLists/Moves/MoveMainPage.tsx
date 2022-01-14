import { GenerationNum } from "../../../../types-queries/Generation";
import MoveSearchMain from "./MoveSearchMain";
import { 
  CartAction,
  TeamAction,
} from "../../../App";

type MoveMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const MoveMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: MoveMainProps) => {
  return (
    <MoveSearchMain 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default MoveMainPage;