import { Team } from '../../../../hooks/App/Team';
import { Dispatches } from '../../../App';
import TeamIcon from './TeamIcon';
import './TeamIcons.css';

type TeamIconsProps = {
  team: Team
  dispatches: Dispatches
}

const TeamIcons = ({
  team,
  dispatches,
}: TeamIconsProps) => {
  return (
    <div className="team-icons__wrapper">
      <TeamIcon
      />
      <TeamIcon
      />
      <TeamIcon
      />
      <TeamIcon
      />
      <TeamIcon
      />
      <TeamIcon
      />
    </div>
  )
};

export default TeamIcons;
