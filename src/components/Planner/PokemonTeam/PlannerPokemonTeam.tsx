import { Pokemon } from '../../../typeDefs/Pokemon';
import PlannerPokemonTeamMember from './PlannerPokemonTeamMember';

type PlannerPokemonTeamProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const PokemonTeam = ({ pokemonList, removePokemonFromTeam }: PlannerPokemonTeamProps) => {
  return (
    <div className="pokemon-team">
      {[
        // Actual members of the team
        ...pokemonList.map((pokemon: Pokemon, idx: number) => (
        <PlannerPokemonTeamMember
          pokemon={pokemon}
          idx={idx}
          removePokemonFromTeam={removePokemonFromTeam}
        />
        )),
        // Placeholder for missing team members
        ...(new Array(6 - pokemonList.length)
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

export default PokemonTeam;