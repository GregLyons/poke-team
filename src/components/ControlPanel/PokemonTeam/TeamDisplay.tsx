import {
  GenerationNum,
} from '../../../types-queries/helpers';
import {
  Pokemon,
} from '../../../types-queries/Planner/Pokemon';

import {
  CartAction,
  Team,
  TeamAction,
} from '../../../hooks/app-hooks';

import TeamMember from './PokemonTeamMember';

type TeamDisplayProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  team: Team
}

const TeamDisplay = ({
  dispatchCart,
  dispatchTeam,
  gen,
  team,
}: TeamDisplayProps) => {
  return (
    <div className="control-panel__team-wrapper">
      Team
    </div>
  );
};

export default TeamDisplay;