import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const AbilityMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
      tierFilter={tierFilter}
    />
  )
}

export default AbilityMainPage;