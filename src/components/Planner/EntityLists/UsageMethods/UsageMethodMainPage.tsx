import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  TeamAction,
} from "../../../../hooks/app-hooks";

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