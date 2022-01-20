import { 
  useRef,
  useState,
} from "react";
import {
  Link,
} from "react-router-dom";
import {
  GenerationNum,
} from "../../../types-queries/Generation";
import {
  PokemonIconDatum,
} from "../../../types-queries/helpers";
import {
  SinglesTier,
  TierFilter,
} from "../../../utils/constants";
import { psIDToTier } from "../../../utils/smogonLogic";
import { PokemonNameData } from "../../../utils/sprites";

import { 
  CartAction,
  TeamAction,
} from "../../App";

import PokemonIcon from "../../PokemonIcon";

type EntitySearchEntryProps = {
  entityClass: string
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
    value: string | number | boolean
  }[]
  icons?: {
    iconData: PokemonIconDatum[]
    dispatchCart: React.Dispatch<CartAction>
    dispatchTeam: React.Dispatch<TeamAction>
    gen: GenerationNum
    tierFilter: TierFilter
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
  const [expand, setExpand] = useState(false);
  const [hover, setHover] = useState(false);

  const initialSelection = icons 
    ? icons.iconData.reduce((acc, curr) => {
        const { psID, name, formattedName, introduced } = curr;
        return {
          ...acc,
          [curr.psID]: {
            nameData: {
              psID,
              name,
              formattedName,
              introduced,
            },
            selected: false,
          }
        };
      }, {})
    : null;


  const [selection, setSelection] = useState<{
      [key: string]: {
        nameData: PokemonNameData,
        selected: boolean,
      }
    }>(initialSelection ? initialSelection : {});

  const toggleSelection = (psID: string) => {
    setSelection({
      ...selection,
      [psID]: {
        nameData: selection[psID].nameData,
        selected: !selection[psID].selected,
      }
    });
  }

  const entryRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  const entryHeight = "6rem";

  const onTimeout = () => {
    setExpand(true);
  }


  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.
  let seenPokemon: {[k: string]: boolean} = {};

  return (
    <div 
    ref={entryRef}
      onMouseEnter={() => { 
        setHover(true);
        // Only expand if there is overflow in the element
        if (entryRef.current && entryRef.current.offsetHeight < entryRef.current.scrollHeight) timer.current = setTimeout(onTimeout, 300);
      }}
      onMouseLeave={() => {
        setHover(false);
        if (timer.current) clearTimeout(timer.current);
        setExpand(false);
      }}
      style={
        expand
          ? { 
              height: entryRef.current?.scrollHeight,
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
        to={`../${entityClass}/${linkName}`}
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
          {icons.iconData.map(pokemonIconDatum => {
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
              <PokemonIcon
                dispatchCart={icons.dispatchCart}
                dispatchTeam={icons.dispatchTeam}
                key={key + '_' + pokemonIconDatum.name + '_icon'}
                pokemonIconDatum={pokemonIconDatum}
                selected={selection[psID].selected}
                toggleSelection={toggleSelection}
              />
            );
          })}
      </div>}
    </div>
  )
}

export default EntitySearchEntry;