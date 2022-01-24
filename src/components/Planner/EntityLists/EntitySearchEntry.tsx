import { 
  useRef,
} from "react";
import {
  Link,
} from "react-router-dom";
import {
  selectionToPokemonIconData,
  useEntryExpand,
  useSelection,
} from "../../../hooks/hooks";
import {
  GenerationNum, ItemIconDatum,
} from "../../../types-queries/helpers";
import {
  PokemonIconDatum,
} from "../../../types-queries/helpers";
import {
  EntityClass,
  ENTITY_CLASS_TO_PLANNER_LINK,
  TierFilter,
} from "../../../utils/constants";
import {
  psIDToTier,
} from "../../../utils/smogonLogic";

import { 
  CartAction,
  TeamAction,
} from "../../App";

import PlannerPokemonIcon from "../PlannerPokemonIcon";
import SelectionControls from "./SelectionControls";

type EntitySearchEntryProps = {
  entityClass: EntityClass
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
    value: string | number | boolean
  }[]
  icons?: {
    pokemonIconData: PokemonIconDatum[]
    itemIconData?: ItemIconDatum
    dispatchCart: React.Dispatch<CartAction>
    dispatchTeam: React.Dispatch<TeamAction>
    gen: GenerationNum
    tierFilter: TierFilter
    cartNote: string
  }
}

const EntitySearchEntry = ({
  entityClass,
  key,
  name,
  linkName,
  description,
  data,
  icons,
}: EntitySearchEntryProps) => {
  // Changing scroll height 
  // #region

  // Ref for component
  const entryRef = useRef<HTMLDivElement>(null);

  // Default height
  const entryHeight = "6rem";
  
  const { hover, expand, expandListeners, originalScrollHeight } = useEntryExpand(entryRef);

  // #endregion


  // Selecting
  // #region

  const [selection, dispatchSelection] = useSelection(icons ? icons.pokemonIconData : undefined);

  const toggleSelection = (psID: string) => {
    dispatchSelection({
      type: 'toggle',
      payload: psID,
    });
  }

  const handleAddToCart = () => {
    if (!icons) return;
    icons.dispatchCart({
      type: 'add_pokemon',
      payload: {
        parentEntityClass: entityClass,
        targetEntityClass: 'Has',
        pokemon: selectionToPokemonIconData(selection),
        note: icons.cartNote,
      }
    });
    dispatchSelection({ type: 'remove_all' });
  }

  // #endregion


  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div 
    ref={entryRef}
      {...expandListeners}
      style={
        expand
          ? { 
              height: originalScrollHeight || 0,
              transitionDuration: entryRef.current 
                ? `${entryRef.current.scrollHeight * 0.5}ms`
                : ``,
            }
          : { 
              height: `${entryHeight}`,
              transitionDuration: entryRef.current 
              ? `${entryRef.current.scrollHeight * 0.5}ms`
              : ``, 
            }
      }
      className="planner__search-row"
      key={key}
    >
      <Link
        to={`../${ENTITY_CLASS_TO_PLANNER_LINK.get(entityClass)}/${linkName}`}
        className="planner__search-row-name"
        style={
          hover
            ? { 
                transform: "scale(1.05)",
                transition: "transform 0.1s",
              }
            : {}
        }
      >
        {name}
      </Link>
      <div 
        className="planner__search-row-description"
      >
        {description}
      </div>
      <div className="planner__search-row-data">
        {data && data.map(({key, value}) => (
          <>
            <b className="planner__search-row-data-key">
              {key}
            </b>
            <div className="planner__search-row-data-value">
              {value}
            </div>
          </>
        ))}
      </div>
      {icons && <div className="planner__search-row-icons">
        {icons.pokemonIconData.map(pokemonIconDatum => {
          const { psID, } = pokemonIconDatum;
          const tier = psIDToTier(icons.gen, psID);

          // Ignore duplicate Pokemon
          if(seenPokemon.hasOwnProperty(pokemonIconDatum.name) || (tier && !icons.tierFilter[tier])) return;
          // Add Pokemon to list of seen Pokemon
          else seenPokemon[pokemonIconDatum.name] = true;

          if (tier && !icons.tierFilter[tier]) {
            return;
          }
          
          return (
            <PlannerPokemonIcon
              dispatchCart={icons.dispatchCart}
              dispatchTeam={icons.dispatchTeam}
              key={key + '_' + pokemonIconDatum.name + '_icon'}
              pokemonIconDatum={pokemonIconDatum}
              selected={selection[psID].selected}
              toggleSelection={toggleSelection}
            />
          );
        })}
        <br />
        <SelectionControls 
          dispatchSelection={dispatchSelection}
          handleAddToCart={handleAddToCart}
        />
      </div>}
    </div>
  )
}

export default EntitySearchEntry;