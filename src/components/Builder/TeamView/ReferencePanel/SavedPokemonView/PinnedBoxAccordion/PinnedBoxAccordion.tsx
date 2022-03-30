import { useMemo } from "react";
import { Team } from "../../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../../App";
import Accordion from "../../../../../Reusables/Accordion/Accordion";
import { SavedPokemonClickHandlers } from "../../../TeamView";
import PinnedBox from "./PinnedBox";
import './PinnedBoxAccordion.css';
import PinnedBoxAccordionTitle from "./PinnedBoxAccordionTitle";


type PinnedBoxAccordionProps = {
  clickHandlers: SavedPokemonClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
}

const PinnedBoxAccordion = ({
  clickHandlers,
  filters,
  team,
}: PinnedBoxAccordionProps) => {
  const accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[] = useMemo(() => {
    const pinnedBoxesInGen = team[filters.genFilter.gen].savedPokemon.pinnedBoxes;
    if (pinnedBoxesInGen === {}) {
      return [];
    }
    const boxes = Object.entries(pinnedBoxesInGen);
    return boxes.map(([note, pokemon]) => {
      return {
        title: <PinnedBoxAccordionTitle
          clickHandlers={clickHandlers}
          titleText={note}
        />,
        content: pokemon.length > 0 
        ? <PinnedBox
            box={{
              note,
              pokemon,
            }}
            clickHandlers={clickHandlers}
            filters={filters}
            key={note}
          />
        : false as false
      }
    }).concat([{
      title: <PinnedBoxAccordionTitle
        titleText={'From Quick Search'}
      />,
      content: Object.values(team[filters.genFilter.gen].savedPokemon.quickSearch).length > 0
        ? <PinnedBox
            box={{
              note: 'From Quick Search',
              pokemon: Object.values(team[filters.genFilter.gen].savedPokemon.quickSearch),
            }}
            clickHandlers={clickHandlers}
            filters={filters}
          />
        : false as false,
    }]);
  }, [filters, team, clickHandlers, ])
  return (
    <div className="team-view-accordion__wrapper">
      {accordionData.filter(d => d.content !== false).length > 0
        ?  <Accordion
            accordionContext="pinned-boxes"
            accordionData={accordionData}
            optionsInTitle={true}
          />
        : <p className="builder__unusable-element-note">
            You currently have no Pokemon saved for Gen {filters.genFilter.gen}. Either <span className="app-element-name --widget">PIN</span> a box in the <span className="app-element-name --section">Cart</span> or <span className="app-element-name --widget">SAVE</span> a Pokemon in the <span className="app-element-name --section">Quick Search</span>.
          </p>
      }
    </div>
  )
};

export default PinnedBoxAccordion;