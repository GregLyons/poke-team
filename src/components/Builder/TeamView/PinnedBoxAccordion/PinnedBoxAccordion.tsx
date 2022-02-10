import { useMemo } from "react";
import { Team } from "../../../../hooks/App/Team";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";
import Accordion from "../../../Reusables/Accordion/Accordion";
import { PinnedBoxClickHandlers } from "../TeamView";
import PinnedBox from "./PinnedBox";
import PinnedBoxAccordionTitle from "./PinnedBoxAccordionTitle";

import './PinnedBoxAccordion.css';

type PinnedBoxAccordion = {
  clickHandlers: PinnedBoxClickHandlers
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
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
    const pinnedBoxesInGen = team.pinnedBoxes?.[filters.genFilter.gen];
    const boxes = Object.entries(pinnedBoxesInGen || []);
    return boxes.map(([note, pokemon]) => {
      console.log(note);
      return {
        title: <PinnedBoxAccordionTitle
          clickHandlers={clickHandlers}
          titleText={note}
        />,
        content: <PinnedBox
          pokemon={pokemon}
          dispatches={dispatches}
          filters={filters}
          key={note}
        />
      }
    })
  }, [dispatches, filters, team, ])
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