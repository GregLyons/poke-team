import { BGAction } from "../../../hooks/App/BGManager";
import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { TierFilter } from "../../../hooks/App/TierFilter";

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const AbilityMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
  tierFilter,
  pokemonFilter,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      dispatchBGManager={dispatchBGManager}
      genFilter={genFilter}
      tierFilter={tierFilter}
      pokemonFilter={pokemonFilter}
    />
  )
}

export default AbilityMainPage;