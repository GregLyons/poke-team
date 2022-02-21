import { Team } from '../../../../hooks/App/Team';
import { Dispatches, Filters } from '../../../App';
import TeamMemberHolder from './TeamMemberHolder';
import './TeamMembers.css';

type TeamMembersProps = {
  team: Team
  dispatches: Dispatches
  filters: Filters
}

const TeamMembers = ({
  team,
  dispatches,
  filters,
}: TeamMembersProps) => {
  console.log(team[filters.genFilter.gen].memberIcons);
  return (
    <div className="team-members__wrapper">
      {team[filters.genFilter.gen].memberIcons.map((icon, idx) => {
        return (
          <TeamMemberHolder
            // Use idx as key since we won't be changing size of array, or permuting its elements
            key={`teamMember_${idx}`}
            dispatches={dispatches}
            filters={filters}
            icon={icon}
            idx={idx}
          />
        )
      })}
    </div>
  )
};

export default TeamMembers;
