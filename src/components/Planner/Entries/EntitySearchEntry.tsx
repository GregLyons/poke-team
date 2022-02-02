import { 
  useEffect,
  useRef,
} from "react";
import { useEntryExpand } from "../../../hooks/Planner/Entries";
import { selectionToPokemonIconData, useSelection } from "../../../hooks/Planner/Selections";
import {
  EntityClass,
} from '../../../utils/constants';

import EntryLink from "./EntryLink";
import { EntryIconData } from "../helpers";
import PlannerPokemonIcons from "../Entries/PlannerPokemonIcons";

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
  icons?: EntryIconData
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
  
  const { hover, expand, expandListeners, originalScrollHeight } = useEntryExpand(entryRef, icons?.genFilter, icons?.tierFilter, icons?.pokemonFilter);

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
        gen: icons.genFilter.gen,
        parentEntityClass: entityClass,
        targetEntityClass: 'Has',
        pokemon: selectionToPokemonIconData(selection),
        note: icons.cartNote,
      }
    });
    dispatchSelection({ type: 'remove_all' });
  }

  // #endregion

  // If there is no icon 
  const hasIcon = useRef(false);
  useEffect(() => {
    hasIcon.current = false;
  }, [icons?.tierFilter])

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
      className="planner-search__entry"
      key={key}
    >
      <EntryLink
        hover={hover}
        parentEntityClass={entityClass}
        targetEntityClass={'From search'}
        linkName={linkName}
        name={name}
        icons={icons}
      />
      <div className="planner-search__entry-data">
        {data && data.map(({key, value}) => (
          <>
            <b className="planner-search__entry-data-key">
              {key}
            </b>
            <div className="planner-search__entry-data-value">
              {value}
            </div>
          </>
        ))}
      </div>
      <div 
        className="planner-search__entry-description"
      >
        {description}
      </div>
      {icons && <PlannerPokemonIcons
        context="search"
        key={key}
        selection={selection}
        dispatchSelection={dispatchSelection}
        toggleSelection={toggleSelection}
        icons={icons}
        handleAddToCart={handleAddToCart}
      />}
    </div>
  )
}

export default EntitySearchEntry;