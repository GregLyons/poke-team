import { Team } from '../../../../hooks/App/Team';
import { Dispatches, Filters } from '../../../App';
import ErrorBoundary from '../../../Reusables/ErrorBoundary/ErrorBoundary';
import { ReferencePanelView, TeamMembersClickHandlers, TeamViewRefKey } from '../TeamView';
import TeamMemberHolder from './TeamMemberHolder';
import './TeamMembers.css';

type TeamMembersProps = {
  focusRef: React.RefObject<HTMLDivElement>
  refKey: TeamViewRefKey
  slot: number | null
  clickHandlers: TeamMembersClickHandlers
  team: Team
  dispatches: Dispatches
  filters: Filters
  view: ReferencePanelView
}

const TeamMembers = ({
  focusRef,
  refKey,
  slot,
  clickHandlers,
  team,
  dispatches,
  filters,
  view,
}: TeamMembersProps) => {
  return (
    <section aria-labelledby="team-members" className="team-members__wrapper">
      <h2 id="team-members" className="hidden-header">Select, add, or remove team members</h2>
      <ErrorBoundary>
        <ul className="team-members__list">
          {team[filters.genFilter.gen].memberIcons.map((icon, idx) => {
            return (
              <TeamMemberHolder
                // Only pass focusRef down if the indices match
                focusRef={view?.idx === idx ? focusRef : undefined}
                refKey={refKey}
                clickHandlers={clickHandlers}
                // Use idx in key since we won't be changing size of array, or permuting its elements
                key={idx}
                dispatches={dispatches}
                filters={filters}
                icon={icon}
                idx={idx}
                selected={idx === slot}
              />
            )
          })}
        </ul>
      </ErrorBoundary>
    </section>
  )
};

export default TeamMembers;
