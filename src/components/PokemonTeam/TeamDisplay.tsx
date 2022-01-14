import {
  Pokemon,
} from '../../types-queries/Pokemon';
import {
  GenerationNum,
} from '../../types-queries/Generation';

import {
  CartAction,
  Team,
  TeamAction,
} from '../App';

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
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...team.map((pokemon: Pokemon, idx: number) => (
        <TeamMember
          gen={gen}
          pokemon={pokemon}
          idx={idx}
          dispatchTeam={dispatchTeam}
        />
        )),
        // Placeholder for missing team members
        ...(new Array(6 - team.length)
            .fill(0)
            .map((d, idx) => (
              <div 
                key={'blank' + idx}
                className="pokemon-team__member">
              </div>
            ))
          ),
      ]}
    </div>
  );
};

export default TeamDisplay;