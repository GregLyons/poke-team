import {
  useContext,
} from 'react';

import { Pokemon } from '../../typeDefs/Pokemon';
import TeamMember from './PokemonTeamMember';

import { TeamContext } from '../../contexts';

const Team = () => {
  const { team, removeFromTeam } = useContext(TeamContext);

  return (
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...team.map((pokemon: Pokemon, idx: number) => (
        <TeamMember
          pokemon={pokemon}
          idx={idx}
          removeFromTeam={removeFromTeam}
        />
        )),
        // Placeholder for missing team members
        ...(new Array(6 - team.length)
            .fill(0)
            .map(d => (
              <div className="pokemon-team__member">
              </div>
            ))
          ),
      ]}
    </div>
  );
};

export default Team;