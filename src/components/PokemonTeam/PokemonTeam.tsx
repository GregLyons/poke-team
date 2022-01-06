import { Pokemon } from '../../typeDefs/Pokemon';
import PokemonTeamMember from './PokemonTeamMember';

type PokemonTeamProps = {
  pokemonList: Pokemon[]
  removePokemonFromTeam: (idx: number) => void
}

const PokemonTeam = (props: PokemonTeamProps) => {
  const { pokemonList, removePokemonFromTeam } = props;

  return (
    <ul>
      {
        pokemonList && pokemonList.length > 0 && 
          pokemonList.map((pokemon: Pokemon, idx: number) => (
            <PokemonTeamMember
              pokemon={pokemon}
              idx={idx}
              removePokemonFromTeam={removePokemonFromTeam}
            />
          ))
      }
    </ul>
  );
};

export default PokemonTeam;