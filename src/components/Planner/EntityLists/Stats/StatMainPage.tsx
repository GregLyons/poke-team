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
} from '../../../../hooks/app-hooks';

import StatSearch from "./StatSearch"

type StatMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const StatMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: StatMainPageProps) => {
  return (
    <StatSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
    />
  )
}

export default StatMainPage;