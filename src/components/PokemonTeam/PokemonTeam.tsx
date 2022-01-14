import {
  useContext,
} from 'react';

import { Pokemon } from '../../types-queries/Pokemon';
import TeamMember from './PokemonTeamMember';

import { TeamContext } from '../../contexts';
import { GenerationNum } from '../../types-queries/Generation';

type TeamProps = {
  gen: GenerationNum
}

const Team = ({ gen }: TeamProps) => {
  const { team, removeFromTeam } = useContext(TeamContext);

  return (
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...team.map((pokemon: Pokemon, idx: number) => (
        <TeamMember
          gen={gen}
          pokemon={pokemon}
          idx={idx}
          removeFromTeam={removeFromTeam}
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

export default Team;