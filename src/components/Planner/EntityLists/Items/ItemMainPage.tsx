import { GenerationNum } from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import ItemSearch from "./ItemSearch";

type ItemMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const ItemMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
      tierFilter={tierFilter}
      pokemonFilter={pokemonFilter}
    />
  )
}

export default ItemMainPage;