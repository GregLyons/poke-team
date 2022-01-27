import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import MoveSearch from "./MoveSearch";

type MoveMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const MoveMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: MoveMainProps) => {
  return (
    <MoveSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
      tierFilter={tierFilter}
    />
  )
}

export default MoveMainPage;