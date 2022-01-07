import { Move } from '../../../typeDefs/Move';
import { getPokemonIcon } from '../../../utils/sprites'

type MoveEntryProps = {
  move: Move
}

const MoveEntry = ({ move }: MoveEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div className="planner__table-row">
      <div className="planner__move-name">
        {move.formattedName}
      </div>
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
      <div className="planner__move-pokemon">
        <div>{move.pokemon.map(pokemon => {
          // Remove duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemon.name)) return;
          else seenPokemon[pokemon.name] = true;

          const {left, top} = getPokemonIcon(pokemon);

          return (
            <div 
              role="img"
              title={`Icon for ${pokemon.name}`}
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