import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from "../../../../utils/constants";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import MoveSearch from "./MoveSearch";

type MoveMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const MoveMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: MoveMainProps) => {
  return (
    <MoveSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
      tierFilter={tierFilter}
    />
  )
}

export default MoveMainPage;