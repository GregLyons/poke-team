import { Move } from '../../../../typeDefs/Move';
import { Pokemon } from '../../../../typeDefs/Pokemon';
import { getPokemonIcon } from '../../../../utils/sprites'

type MoveEntryProps = {
  addPokemonToTeam: (pokemon: Pokemon) => void
  move: Move
}

const MoveEntry = ({
  addPokemonToTeam,
  move,
}: MoveEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className="planner__table-row">
      {/* Move name */}
      <div className="planner__move-name">
        {move.formattedName}
      </div>

      {/* Move data */}
      <div className="planner__move-data">
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
      <div className="planner__move-pokemon">
        <div>{move.pokemon.map(pokemon => {
          // Ignore duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemon.name)) return;
          // Add Pokemon to list of seen Pokemon
          else seenPokemon[pokemon.name] = true;
          
          const {left, top} = getPokemonIcon(pokemon);
          
          return (
            <div
              title={`Icon for ${pokemon.formattedName}`}
              key={move.id + '_' + pokemon.name}
              style={{
                width: '40px',
                height: '30px',
                display: 'inline-block',
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/icons/pokemonicons-sheet.png'})`,
                backgroundPosition: `${left}px ${top}px`,
                backgroundRepeat: 'no-repeat',
              }}

              
            />
          )
        })}</div>
      </div>
    </div>
  );
}

export default MoveEntry;