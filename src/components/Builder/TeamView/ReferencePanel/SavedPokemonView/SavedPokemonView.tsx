import { Team } from "../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../App";
import { SavedPokemonClickHandlers } from "../../TeamView";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";
import './SavedPokemonView.css';


type SavedPokemonViewProps = {
  focusRef: React.RefObject<HTMLDivElement>
  clickHandlers: SavedPokemonClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const SavedPokemonView = ({
  focusRef,
  clickHandlers,
  dispatches,
  filters,
  team,
}: SavedPokemonViewProps) => {
  return (
    <div
      ref={focusRef}
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