import { PokemonIconDispatches, PokemonIconFilters } from "../../App";

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const AbilityMainPage = ({ 
  dispatches,
  filters,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default AbilityMainPage;