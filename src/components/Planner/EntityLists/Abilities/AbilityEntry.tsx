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
    <div className="planner__main-search-table-row planner__main-search-table-row--ability">
      {/* Ability name */}
      <Link 
        to={`${ability.name}`}
        className="planner__main-search-row-name"
      >
        {ability.formattedName}
      </Link>

      <div className="planner__main-search-row-description">
        {ability.description}
      </div>

      <div className="planner__main-search-row-data">
      </div>

      {/* Pokemon icons */}
      <div className="planner__main-search-row-icons">
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