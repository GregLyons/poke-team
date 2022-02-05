import TypeSearch from "./TypeSearch"
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";

type TypeMainPageProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const TypeMainPage = ({ 
  dispatches,
  filters,
}: TypeMainPageProps) => {
  return (
    <TypeSearch
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default TypeMainPage;