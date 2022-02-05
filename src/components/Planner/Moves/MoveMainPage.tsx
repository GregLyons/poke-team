import {
  GenerationNum,
} from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import MoveSearch from "./MoveSearch";
import { BGAction, BGManager } from "../../../hooks/App/BGManager";

type MoveMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const MoveMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
  tierFilter,
  pokemonFilter,
}: MoveMainProps) => {
  return (
    <MoveSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      dispatchBGManager={dispatchBGManager}
      genFilter={genFilter}
      tierFilter={tierFilter}
      pokemonFilter={pokemonFilter}
    />
  )
}

export default MoveMainPage;