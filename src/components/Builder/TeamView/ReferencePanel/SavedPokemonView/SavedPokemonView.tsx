import { Team } from "../../../../../hooks/App/Team";
import { Filters } from "../../../../App";
import { SavedPokemonClickHandlers } from "../../TeamView";

type SavedPokemonViewProps = {
  clickHandlers: SavedPokemonClickHandlers
  filters: Filters
  team: Team
};

const SavedPokemonView = ({
  clickHandlers,
  filters,
  team,
}: SavedPokemonViewProps) => {
  return (
    <div>

    </div>
  )
};

export default SavedPokemonView;