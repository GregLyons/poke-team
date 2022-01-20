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