import { Pokemon, getPokemonSprite } from '../../typeDefs/Pokemon';

type PokemonTeamMemberProps = {
  pokemon: Pokemon
  idx: number
  removePokemonFromTeam: (idx: number) => void
}

// Converts keys from BaseStat object to formatted names.
// const baseStatMap_fullName = new Map([
//   ['hp', 'HP'],
//   ['attack', 'Attack'],
//   ['defense', 'Defense'],
//   ['specialAttack', 'Special Attack'],
//   ['specialDefense', 'Special Defense'],
//   ['speed', 'Speed'],
// ]);

// Converts keys from BaseStat object to formatted, abbreviated names.
const baseStatMap_abbr = new Map([
  ['hp', 'HP'],
  ['attack', 'Atk'],
  ['defense', 'Def'],
  ['specialAttack', 'SpA'],
  ['specialDefense', 'SpD'],
  ['speed', 'Spe'],
]);

const PokemonTeamMember = (
  {pokemon, idx, removePokemonFromTeam}: PokemonTeamMemberProps
) => {
  const {url, w: width, h: height, pixelated} = getPokemonSprite(pokemon);

  return (
    <div className="pokemon-team__member">
      {/* Sprite */}
      <img 
        src={url}
        width={width}
        height={height}
        style={{imageRendering: `${pixelated ? 'pixelated' : 'auto'}`}}
        className="pokemon-team__sprite"
      />
      {/* Name */}
      <p className="pokemon-team__pokemon-name">
        {pokemon.formattedName}
      </p>


      {/* Base stat info */}
      <ul className="pokemon-team__stats-list">
        {Object.entries(pokemon.baseStats).map(stat => {
          const [statName, statValue] = stat;

          // Remove __typename
          if (statName === '__typename') return null;


          return (
          <li key={pokemon.id + '_' + idx + '_' + statName}>
            {baseStatMap_abbr.get(statName)}: {statValue}
          </li>
          );
        })}
      </ul>


      {/* Type info */}
      <p>
        Typing: {pokemon.typing.join(' ')}
      </p>


      {/* Move info */}
      {pokemon.moveset.length > 0 ? (
        <ul>
          {pokemon.moveset.map(moveName => (
            <li 
              key={pokemon.id + '_' + idx + '_' + moveName}
            >
              {moveName}
            </li>
          ))}
        </ul>
      ) : ''}


      {/* Remove button */}
      <button
        className="pokemon-team__remove-btn"
        onClick={() => removePokemonFromTeam(idx)}
      >
        Remove
      </button>
    </div>
  );
}

export default PokemonTeamMember;