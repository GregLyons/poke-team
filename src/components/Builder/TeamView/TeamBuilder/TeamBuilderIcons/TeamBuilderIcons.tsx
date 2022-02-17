import { Team } from '../../../../../hooks/App/Team';
import { Dispatches } from '../../../../App';
import TeamBuilderIcon from './TeamBuilderIcon';
import './TeamBuilderIcons.css';

type TeamBuilderIconsProps = {
  team: Team
  dispatches: Dispatches
}

const TeamBuilderIcons = ({
  team,
  dispatches,
}: TeamBuilderIconsProps) => {
  return (
    <div className="team-builder__icons-wrapper">
      <TeamBuilderIcon
      />
      <TeamBuilderIcon
      />
      <TeamBuilderIcon
      />
      <TeamBuilderIcon
      />
      <TeamBuilderIcon
      />
      <TeamBuilderIcon
      />
    </div>
  )
};

export default TeamBuilderIcons;
