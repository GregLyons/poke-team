import { Team } from "../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../App";
import { SavedPokemonClickHandlers } from "../../TeamView";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";
import PinnedBox from "./PinnedBoxAccordion/PinnedBox";

import './SavedPokemonView.css';

type SavedPokemonViewProps = {
  clickHandlers: SavedPokemonClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const SavedPokemonView = ({
  clickHandlers,
  dispatches,
  filters,
  team,
}: SavedPokemonViewProps) => {
  return (
    <div
      className="saved-pokemon__wrapper"
    >
      <PinnedBoxAccordion
        clickHandlers={clickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
    </div>
  )
};

export default SavedPokemonView;