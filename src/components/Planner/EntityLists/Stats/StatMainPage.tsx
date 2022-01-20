import {
  GenerationNum,
} from "../../../../types-queries/Generation";
import {
  TierFilter,
} from "../../../../utils/constants";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import StatSearch from "./StatSearch"

type StatMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const StatMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: StatMainPageProps) => {
  return (
    <StatSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default StatMainPage;