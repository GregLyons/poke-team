import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import ErrorBoundary from "../../../Reusables/ErrorBoundary/ErrorBoundary";
import { MemberDetailsHandlers, ReferencePanelView, TeamViewRefKey } from "../TeamView";
import './MemberDetails.css';
import MemberDetailsCosmetic from "./MemberDetailsCosmetic/MemberDetailsCosmetic";
import MemberDetailsExtra from "./MemberDetailsExtra/MemberDetailsExtra";
import MemberDetailsMain from "./MemberDetailsMain/MemberDetailsMain";


type MemberDetailsProps = {
  focusRef: React.RefObject<HTMLDivElement>
  nicknameRef: React.RefObject<HTMLDivElement>
  refKey: TeamViewRefKey
  dispatches: Dispatches
  filters: Filters
  handlers: MemberDetailsHandlers
  team: Team
  memberSlot: number | null
  view: ReferencePanelView
};

const MemberDetails = ({
  focusRef,
  nicknameRef,
  refKey,
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
    <section aria-labelledby="member-details" className="member-details__wrapper">
      <h2 id="member-details" className="hidden-header" title={`Details for ${member.formattedPSID}.`}>Member details</h2>
      <ErrorBoundary orientation="right">
        <MemberDetailsCosmetic
          member={member}
          handlers={handlers}
        />
      </ErrorBoundary>
      <ErrorBoundary orientation="right">
        <MemberDetailsExtra
          nicknameRef={nicknameRef}
          member={member}
          handlers={handlers}
          gen={gen}
        />
      </ErrorBoundary>
      <ErrorBoundary orientation="top">
        <MemberDetailsMain
          nicknameRef={nicknameRef}
          focusRef={focusRef}
          refKey={refKey}
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