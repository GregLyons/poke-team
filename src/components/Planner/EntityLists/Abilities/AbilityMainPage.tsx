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

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const AbilityMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
      tierFilter={tierFilter}
    />
  )
}

export default AbilityMainPage;