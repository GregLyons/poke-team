import { Team } from '../../../../hooks/App/Team';
import { Dispatches, Filters } from '../../../App';
import { TeamMembersClickHandlers } from '../TeamView';
import TeamMemberHolder from './TeamMemberHolder';
import './TeamMembers.css';

type TeamMembersProps = {
  slot: number | null
  clickHandlers: TeamMembersClickHandlers
  team: Team
  dispatches: Dispatches
  filters: Filters
}

const TeamMembers = ({
  slot,
  clickHandlers,
  team,
  dispatches,
  filters,
}: TeamMembersProps) => {
  return (
    <section className="team-members__wrapper">
      <h2 className="hidden-header">Select, add, or remove team members</h2>
      <ul className="team-members__list">
        {team[filters.genFilter.gen].memberIcons.map((icon, idx) => {
          return (
            <TeamMemberHolder
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
    </section>
  )
};

export default TeamMembers;
