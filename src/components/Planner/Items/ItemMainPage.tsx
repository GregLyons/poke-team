import { GenerationNum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import ItemSearch from "./ItemSearch";
import { BGAction, BGManager } from "../../../hooks/App/BGManager";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";

type ItemMainProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const ItemMainPage = ({ 
  dispatches,
  filters,
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default ItemMainPage;