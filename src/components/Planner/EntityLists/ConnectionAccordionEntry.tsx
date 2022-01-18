import { Link } from "react-router-dom";
import { PokemonIconDatum } from "../../../types-queries/helpers";
import { CartAction, TeamAction } from "../../App";
import PokemonIcon from "../../PokemonIcon";


type ConnectionAccordionProps = {
  targetEntityClass: string
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

const ConnectionAccordionEntry = ({
  targetEntityClass,
  key,
  name,
  linkName,
  description,
  data,
  icons,
}: ConnectionAccordionProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div 
      className="planner__accordion-row"
      key={key}
    >
      <Link 
        to={`../${targetEntityClass}/${linkName}`}
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
            <b className="planner__accordion-row-data-key">
              {key}
            </b>
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

export default ConnectionAccordionEntry;