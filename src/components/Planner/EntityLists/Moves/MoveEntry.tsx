import {
  Link,
  Outlet,
} from 'react-router-dom';

import { 
  MoveInSearch,
} from '../../../../types-queries/Move';

import { 
  CartAction,
  TeamAction,
} from "../../../App";
import PokemonIcon from '../../../PokemonIcon';

type MoveEntryProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  move: MoveInSearch
}

const MoveEntry = ({
  dispatchCart,
  dispatchTeam,
  move,
}: MoveEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className="planner__main-search-table-row planner__main-search-table-row--move">
      {/* Move name */}
      <Link 
        to={`${move.name}`}
        className="planner__main-search-row-name"
      >
        {move.formattedName}
      </Link>

      <div className="planner__main-search-row-description">
        {move.description}
      </div>

      {/* Move data */}
      <div className="planner__main-search-row-data">
        <div>Accuracy: {move.accuracy}</div>
        <div>Category: {move.category}</div>
        <div>{move.contact ? 'Contact' : 'Non-contact'}</div>
        <div>Power: {move.power}</div>
        <div>PP: {move.pp}</div>
        <div>Priority: {move.priority}</div>
        <div>Target: {move.target}</div>
        <div>Type: {move.type}</div>
      </div>

      {/* Pokemon icons */}
      <div className="planner__main-search-row-icons">
        <div>
          {move.pokemonIconData.map(pokemonIconDatum => {
            // Ignore duplicate Pokemon
            if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return;
            // Add Pokemon to list of seen Pokemon
            else seenPokemon[pokemonIconDatum.name] = true;
            
            return (
              <PokemonIcon
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                key={'moveEntry_' + move.id + '_' + pokemonIconDatum.name + '_icon'}
                pokemonIconDatum={pokemonIconDatum} 
              />
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MoveEntry;