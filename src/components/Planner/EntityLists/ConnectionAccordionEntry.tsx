import { 
  useRef,
  useState,
} from "react";
import {
  Link,
} from "react-router-dom";
import { GenerationNum } from "../../../types-queries/Generation";
import {
  PokemonIconDatum,
} from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/constants";
import { psIDToTier } from "../../../utils/smogonLogic";
import { PokemonNameData } from "../../../utils/sprites";
import { 
  CartAction,
  TeamAction,
} from "../../App";
import PokemonIcon from "../../PokemonIcon";


type ConnectionAccordionEntryProps = {
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
    gen: GenerationNum
    tierFilter: TierFilter
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
}: ConnectionAccordionEntryProps) => {
  const [expand, setExpand] = useState(false);
  const [hover, setHover] = useState(false);

  const entryRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  const [selection, setSelection] = useState<{
      [key: string]: {
        nameData: PokemonNameData,
        selected: boolean,
      }
    }>({});

  const toggleSelection = (psID: string) => {
    setSelection({
      ...selection,
      [psID]: {
        nameData: selection[psID].nameData,
        selected: !selection[psID].selected,
      }
    });
  }

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
      className="planner__accordion-row"
      key={key}
    >
      <Link
        to={`../${targetEntityClass}/${linkName}`}
        className="planner__accordion-row-name"
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
        className="planner__accordion-row-description"
      >
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
            const { formattedName, name, psID, introduced } = pokemonIconDatum;
            const tier = psIDToTier(icons.gen, pokemonIconDatum.psID);

            // Ignore duplicate Pokemon
            if(seenPokemon.hasOwnProperty(pokemonIconDatum.name)) return
          
            // Add Pokemon to list of seen Pokemon
            else seenPokemon[pokemonIconDatum.name] = true;

            if (tier && !icons.tierFilter[tier]) {
              return;
            }

            setSelection({
              ...selection,
              [psID]: {
                nameData: {
                  formattedName,
                  name,
                  psID,
                  introduced,
                },
                selected: 
                  selection[psID] 
                    ? selection[psID].selected === undefined 
                      ? false
                      : selection[psID].selected
                    : false,
              }
            });
            
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

export default ConnectionAccordionEntry;