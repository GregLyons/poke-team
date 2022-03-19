import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import ErrorBoundary from "../../../Reusables/ErrorBoundary/ErrorBoundary";
import { MemberDetailsHandlers, ReferencePanelView } from "../TeamView";
import './MemberDetails.css';
import MemberDetailsCosmetic from "./MemberDetailsCosmetic/MemberDetailsCosmetic";
import MemberDetailsExtra from "./MemberDetailsExtra/MemberDetailsExtra";
import MemberDetailsMain from "./MemberDetailsMain/MemberDetailsMain";


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
    <div className="member-details__wrapper --inactive" title="No member selected." />
  );

  const gen = filters.genFilter.gen;

  return (
    <section className="member-details__wrapper">
      <h2 className="hidden-header" title={`Details for ${member.formattedPSID}.`}>Member details</h2>
      <ErrorBoundary>
        <MemberDetailsCosmetic
          member={member}
          handlers={handlers}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <MemberDetailsExtra
          member={member}
          handlers={handlers}
          gen={gen}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <MemberDetailsMain
          member={member}
          handlers={handlers}
          gen={gen}
          view={view}
        />
      </ErrorBoundary>
    </section>
  )
};

export default MemberDetails;