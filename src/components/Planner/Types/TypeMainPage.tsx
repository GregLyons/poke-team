import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import TypeSearch from "./TypeSearch"
import { BGAction } from "../../../hooks/App/BGManager";

type TypeMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const TypeMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
  tierFilter,
  pokemonFilter,
}: TypeMainPageProps) => {
  return (
    <TypeSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      dispatchBGManager={dispatchBGManager}
      genFilter={genFilter}
      tierFilter={tierFilter}
      pokemonFilter={pokemonFilter}
    />
  )
}

export default TypeMainPage;