import { Pokemon } from '../../typeDefs/Pokemon';
import PokemonTeamMember from './PokemonTeamMember';

type PokemonTeamProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const PokemonTeam = (props: PokemonTeamProps) => {
  const { pokemonList, removePokemonFromTeam } = props;

  return (
    <div className="pokemon-team">
      {pokemonList && pokemonList.length > 0 && 
        [
          // Actual members of the team
          ...pokemonList.map((pokemon: Pokemon, idx: number) => (
          <PokemonTeamMember
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
        ]
      }
    </div>
  );
};

export default PokemonTeam;