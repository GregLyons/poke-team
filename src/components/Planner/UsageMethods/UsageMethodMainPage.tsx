import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { TierFilter } from "../../../hooks/App/TierFilter";

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