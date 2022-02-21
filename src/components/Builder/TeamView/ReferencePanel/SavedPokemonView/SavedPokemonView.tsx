import { Team } from "../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../App";
import { ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";
import PinnedBox from "./PinnedBoxAccordion/PinnedBox";

import './SavedPokemonView.css';
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../../types-queries/helpers";

type SavedPokemonViewProps = {
  clickHandlers: SavedPokemonClickHandlers
  view: ReferencePanelView
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const SavedPokemonView = ({
  clickHandlers,
  view,
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