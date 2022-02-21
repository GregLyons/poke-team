import { useMemo } from "react";
import { Team } from "../../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../../App";
import Accordion from "../../../../../Reusables/Accordion/Accordion";
import { ReferencePanelClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../../TeamView";
import PinnedBox from "./PinnedBox";
import PinnedBoxAccordionTitle from "./PinnedBoxAccordionTitle";

import './PinnedBoxAccordion.css';
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../../../types-queries/helpers";

type PinnedBoxAccordion = {
  clickHandlers: SavedPokemonClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
}

const PinnedBoxAccordion = ({
  clickHandlers,
  dispatches,
  filters,
  team,
}: PinnedBoxAccordion) => {
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
        content: <PinnedBox
          box={{
            note,
            pokemon,
          }}
          clickHandlers={clickHandlers}
          dispatches={dispatches}
          filters={filters}
          key={note}
        />
      }
    }).concat([{
      title: <PinnedBoxAccordionTitle
        titleText={'From Quick Search'}
      />,
      content: <PinnedBox
        box={{
          note: 'From Quick Search',
          pokemon: Object.values(team[filters.genFilter.gen].savedPokemon.quickSearch),
        }}
        clickHandlers={clickHandlers}
        dispatches={dispatches}
        filters={filters}
        key="From Quick Search"
      />,
    }]);
  }, [dispatches, filters, team, clickHandlers, ])
  return (
    <div className="team-view-accordion__wrapper">
      <Accordion
        accordionContext="pinned-boxes"
        accordionData={accordionData}
        optionsInTitle={true}
      />
    </div>
  )
};

export default PinnedBoxAccordion;