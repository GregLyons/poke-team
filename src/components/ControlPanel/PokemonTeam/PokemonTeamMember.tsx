import { TeamAction } from '../../../hooks/App/Team';
import {
  GenerationNum,
} from '../../../types-queries/helpers';
import {
  Pokemon,
} from '../../../types-queries/Planner/Pokemon';
import {
  getPokemonSprite,
} from '../../../utils/sprites';

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

type TeamMemberProps = {
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  idx: number
  pokemon: Pokemon
}

const TeamMember = ({
  dispatchTeam,
  gen,
  idx,
  pokemon,
}: TeamMemberProps) => {
  const {url, w: width, h: height, pixelated} = getPokemonSprite(pokemon, gen);

  return (
    <div className="pokemon-team__member">
      {/* Sprite */}
      <div className="pokemon-team__sprite-container">
        <img 
          src={url}
          alt={`Sprite for ${pokemon.name}.`}
          width={width}
          height={height}
          style={{imageRendering: `${pixelated ? 'pixelated' : 'auto'}`}}
          className="pokemon-team__sprite"
        />
      </div>

      
      {/* Name */}
      <p className="pokemon-team__pokemon-name">
        {pokemon.formattedName}
      </p>
      
      {/* Remove button */}
      <button
        className="pokemon-team__remove-btn"
        onClick={() => dispatchTeam({ type: 'remove', payload: idx })}
      >
        Remove
      </button>
    </div>
  );
}

export default TeamMember;