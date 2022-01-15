import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  AbilityInSearch,
} from '../../../../types-queries/Ability';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import PokemonIcon from '../../../PokemonIcon';

type AbilityEntryProps = {
  ability: AbilityInSearch
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
}

const AbilityEntry = ({
  ability,
  dispatchCart,
  dispatchTeam,
}: AbilityEntryProps) => {
  return (
    <div className="planner__table-row">
      {/* Ability name */}
      <Link 
        to={`${ability.name}`}
        className="planner__ability-name"
      >
        {ability.formattedName}
      </Link>

      {/* Pokemon icons */}
      <div className="planner__ability-pokemon">
        <div>
          {ability.pokemonIconData.map(pokemonIconDatum => {
            return (
              <PokemonIcon
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                key={'abilityEntry_' + ability.id + '_' + pokemonIconDatum.name + '_icon'}
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

export default AbilityEntry;