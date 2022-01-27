import {
  GenerationNum,
} from '../../../types-queries/helpers';
import {
  Pokemon,
} from '../../../types-queries/Planner/Pokemon';

import {
  CartAction,
  GenFilter,
  Team,
  TeamAction,
} from '../../../hooks/app-hooks';

import TeamMember from './PokemonTeamMember';

type TeamDisplayProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  team: Team
}

const TeamDisplay = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  team,
}: TeamDisplayProps) => {
  return (
    <div className="control-panel__team-wrapper">
      Team
    </div>
  );
};

export default TeamDisplay;