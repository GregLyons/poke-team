import MoveSearch from "./MoveSearch";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";

type MoveMainProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const MoveMainPage = ({ 
  dispatches,
  filters,
}: MoveMainProps) => {
  return (
    <MoveSearch 
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default MoveMainPage;