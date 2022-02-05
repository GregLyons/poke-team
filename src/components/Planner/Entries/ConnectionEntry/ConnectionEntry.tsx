import {
  useRef,
} from "react";

import {
  EntityClass,
} from "../../../../utils/constants";

import EntryLink from "../EntryLink";
import { EntryIconData } from "../../helpers";
import PlannerPokemonIcons from "../Icons/PlannerPokemonIcons";
import { useEntryExpand } from "../../../../hooks/Planner/Entries";
import { selectionToPokemonIconData, useSelection, } from "../../../../hooks/Planner/Selections";

import './ConnectionEntry.css';

type ConnectionAccordionEntryProps = {
  parentEntityClass: EntityClass
  targetEntityClass: EntityClass
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
    title: string
    value: string | number
  }[]
  icons?: EntryIconData
}

const ConnectionAccordionEntry = ({
  parentEntityClass,
  targetEntityClass,
  key,
  name,
  linkName,
  description,
  data,
  icons,
}: ConnectionAccordionEntryProps) => {
  // Changing scroll height 
  // #region

  // Ref for component
  const entryRef = useRef<HTMLDivElement>(null);

  // Default height
  const entryHeight = "6rem";
  
  const { hover, expand, expandListeners, originalScrollHeight, } = useEntryExpand(entryRef, icons?.genFilter, icons?.tierFilter, icons?.pokemonFilter);

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
        parentEntityClass,
        targetEntityClass,
        pokemon: selectionToPokemonIconData(selection),
        note: icons.cartNote,
      }
    });
    dispatchSelection({ type: 'remove_all' });
  }

  // #endregion


  return (
    <div 
      ref={entryRef}
      {...expandListeners}
      style={
        expand 
          ? { 
              height: originalScrollHeight || 0,
              transition: entryRef.current 
                ? `height ${entryRef.current.scrollHeight * 0.5}ms`
                : ``,
            }
          : { 
              height: `${entryHeight}`,
              transition: entryRef.current 
              ? `height ${entryRef.current.scrollHeight * 0.5}ms`
              : ``, 
            }
      }
      className="planner-accordion__entry"
      key={key}
    >
      <EntryLink
        hover={hover}
        parentEntityClass={parentEntityClass}
        targetEntityClass={targetEntityClass}
        linkName={linkName}
        name={name}
        icons={icons}
      />

      <div className="planner-accordion__entry-data">
        {data && data.map(({key, title, value}) => (
          <>
            <b 
              className="planner-accordion__entry-data-key"
              title={title}
            >
              {key}
            </b>
            <div className="planner-accordion__entry-data-value">
              {value}
            </div>
          </>
        ))}
      </div>

      <div 
        className="planner-accordion__entry-description"
      >
        {description}
      </div>

      {icons && <PlannerPokemonIcons
        context="accordion" 
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

export default ConnectionAccordionEntry;