import { Team } from "../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../App";
import { SavedPokemonClickHandlers } from "../../TeamView";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";
import PinnedBox from "./PinnedBoxAccordion/PinnedBox";

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
        clickHandlers={clickHandlers.cartClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
      <div
        className="saved-pokemon__quick-search-wrapper"
      >
        <PinnedBox
          box={{
            note: 'From Quick Search',
            pokemon: Object.values(team[filters.genFilter.gen].savedPokemon.quickSearch),
          }}
          dispatches={dispatches}
          filters={filters}
          key="From Quick Search"
        />
      </div>
    </div>
  )
};

export default SavedPokemonView;