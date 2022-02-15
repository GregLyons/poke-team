import { GenerationNum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import ItemSearch from "./ItemSearch";
import { BGAction, BGManager } from "../../../hooks/App/BGManager";
import { Dispatches, Filters } from "../../App";

type ItemMainProps = {
  dispatches: Dispatches
  filters: Filters
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