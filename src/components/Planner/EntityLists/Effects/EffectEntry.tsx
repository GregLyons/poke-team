import {
  Link, Outlet,
} from 'react-router-dom';

import { Effect } from '../../../../typeDefs/Effect';
import { Pokemon } from '../../../../typeDefs/Pokemon';

type EffectEntryProps = {
  addToTeam: (pokemon: Pokemon) => void
  effect: Effect
}

const EffectEntry = ({
  effect
}: EffectEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.

  return (
    <div className="planner__table-row">
      {/* Effect name */}
      <Link 
        to={`${effect.name}`}
        className="planner__effect-name"
      >
        {effect.formattedName}
      </Link>

      {/* Moves with this effect */}
      <div className="planner__effect-move">
        <div>{false && 
          effect.moves.map(move => {
            return (
              <div>{move.name}</div>
            )
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default EffectEntry;