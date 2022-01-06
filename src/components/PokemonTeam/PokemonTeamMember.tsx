import { Pokemon } from '../../typeDefs/Pokemon';

type PokemonTeamMemberProps = {
  pokemon: Pokemon
  idx: number
  removePokemonFromTeam: (idx: number) => void
}

const PokemonTeamMember = (
  {pokemon, idx, removePokemonFromTeam}: PokemonTeamMemberProps
) => (
  <li>
    {pokemon.name}
    <ul>
      {Object.entries(pokemon.baseStats).map(stat => {
        const [statName, statValue] = stat;

        // Remove __typename
        if (statName === '__typename') return null;


        return (
        <li key={pokemon.id + '_' + idx + '_' + statName}>
          {statName}: {statValue}
        </li>
        );
      })}
    </ul>
    {pokemon.typing.join(' ')}
    <br />
    <button
      onClick={() => removePokemonFromTeam(idx)}
    >
      Remove
    </button>
  </li>
)

export default PokemonTeamMember;