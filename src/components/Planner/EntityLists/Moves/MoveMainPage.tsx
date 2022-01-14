import { GenerationNum } from "../../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import MoveSearch from "./MoveSearch";

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
    <MoveSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default MoveMainPage;