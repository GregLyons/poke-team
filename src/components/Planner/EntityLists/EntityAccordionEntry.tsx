import { Link } from "react-router-dom";
import { PokemonIconDatum } from "../../../types-queries/helpers";
import { CartAction, TeamAction } from "../../App";
import PokemonIcon from "../../PokemonIcon";


type EntityAccordionEntryProps = {
  parentEntityClass: string
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
    value: string | number 
  }[]
  icons?: {
    iconData: PokemonIconDatum[]
    dispatchCart: React.Dispatch<CartAction>
    dispatchTeam: React.Dispatch<TeamAction>
  }
}

const EntityAccordionEntry = ({
  parentEntityClass,
  key,
  name,
  linkName,
  description,
  data,
  icons,
}: EntityAccordionEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div 
      className="planner__accordion-row"
      key={key}
    >
      <Link 
        to={`../${parentEntityClass}/${linkName}`}
        className="planner__accordion-row-name"
      >
        {name}
      </Link>
      <div className="planner__accordion-row-description">
        {description}
      </div>
      <div className="planner__accordion-row-data">
        {data && data.map(({key, value}) => (
          <>
            <div className="planner__accordion-row-data-head">
              {key}
            </div>
            <div className="planner__accordion-row-data-value">
              {value}
            </div>
          </>
        ))}
      </div>
      {icons && <div className="planner__accordion-row-icons">
          {icons.iconData.map(pokemonIconDatum => {
            // Ignore duplicate Pokemon
            if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return;
            // Add Pokemon to list of seen Pokemon
            else seenPokemon[pokemonIconDatum.name] = true;
            
            return (
              <PokemonIcon
                dispatchCart={icons.dispatchCart}
                dispatchTeam={icons.dispatchTeam}
                key={key + '_' + pokemonIconDatum.name + '_icon'}
                pokemonIconDatum={pokemonIconDatum} 
              />
            );
          })}
      </div>}
    </div>
  )
}

export default EntityAccordionEntry;