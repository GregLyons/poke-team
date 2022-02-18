import { useMemo } from "react";
import { Team } from "../../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../../App";
import Accordion from "../../../../Reusables/Accordion/Accordion";
import { CartClickHandlers, ReferencePanelClickHandlers } from "../../TeamView";
import PinnedBox from "./PinnedBox";
import PinnedBoxAccordionTitle from "./PinnedBoxAccordionTitle";

import './PinnedBoxAccordion.css';

type PinnedBoxAccordion = {
  clickHandlers: CartClickHandlers
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
    const boxes = Object.entries(pinnedBoxesInGen || []);
    return boxes.map(([note, pokemon]) => {
      console.log(note);
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