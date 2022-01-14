import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  getPokemonIcon,
} from '../../../../utils/sprites';

import {
  AbilityInSearch,
} from '../../../../types-queries/Ability';

type AbilityEntryProps = {
  ability: AbilityInSearch
}

const AbilityEntry = ({
  ability,
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
        <div>{false && 
          ability.pokemonIconData.map(pokemonIconDatum => {
            const {left, top} = getPokemonIcon(pokemonIconDatum);
            
            return (
              <div
                title={`Icon for ${pokemonIconDatum.formattedName}`}
                key={'moveEntry_' + ability.id + '_' + pokemonIconDatum.name + '_icon'}
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
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AbilityEntry;