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

import UsageMethodSearch from "./UsageMethodSearch"

type UsageMethodMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const UsageMethodMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: UsageMethodMainPageProps) => {
  return (
    <UsageMethodSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default UsageMethodMainPage;