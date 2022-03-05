import { HPTypeName } from "@pkmn/data";
import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { MemberDetailsHandlers, ReferencePanelView } from "../TeamView";

import './MemberDetails.css';
import MemberDetailsExtra from "./MemberDetailsExtra/MemberDetailsExtra";
import MemberDetailsMain from "./MemberDetailsMain/MemberDetailsMain";
import MemberDetailsCosmetic from "./MemberDetailsCosmetic/MemberDetailsCosmetic";

type MemberDetailsProps = {
  dispatches: Dispatches
  filters: Filters
  handlers: MemberDetailsHandlers
  team: Team
  memberSlot: number | null
  view: ReferencePanelView
};

const MemberDetails = ({
  filters,
  handlers,
  team,
  memberSlot,
  view,
}: MemberDetailsProps) => {
  const member = memberSlot !== null
    ? team[filters.genFilter.gen].members[memberSlot]
    : null;

  if (member === null || memberSlot === null) return (
    <div className="member-details__wrapper member-details__wrapper--inactive" />
  );

  const gen = filters.genFilter.gen;

  return (
    <div className="member-details__wrapper">
      <MemberDetailsCosmetic
        member={member}
        handlers={handlers}
      />
      <MemberDetailsExtra
        member={member}
        handlers={handlers}
        gen={gen}
      />
      <MemberDetailsMain
        member={member}
        handlers={handlers}
        gen={gen}
        view={view}
      />
    </div>
  )
};

let a: HPTypeName

export default MemberDetails;