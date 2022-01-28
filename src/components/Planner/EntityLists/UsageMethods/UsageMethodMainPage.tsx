import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from "../../../../hooks/app-hooks";

import UsageMethodSearch from "./UsageMethodSearch"

type UsageMethodMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const UsageMethodMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: UsageMethodMainPageProps) => {
  return (
    <UsageMethodSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
    />
  )
}

export default UsageMethodMainPage;