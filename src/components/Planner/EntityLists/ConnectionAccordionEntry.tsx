import {
  useEffect,
  useRef,
} from "react";

import {
  selectionToPokemonIconData,
  useEntryExpand,
  useSelection,
} from "../../../hooks/planner-hooks";

import {
  GenerationNum, ItemIconDatum,
} from "../../../types-queries/helpers";
import {
  PokemonIconDatum,
} from "../../../types-queries/helpers";
import {
  EntityClass,
} from "../../../utils/constants";
import {
  TierFilter,
} from "../../../utils/smogonLogic";
import {
  psIDToSinglesTier,
} from "../../../utils/smogonLogic";
import { 
  CartAction,
  TeamAction,
} from '../../../hooks/app-hooks';

import PlannerPokemonIcon from "../PlannerPokemonIcon";
import EntryLink from "./EntryLink";
import { EntryIconData } from "./helpers";
import PlannerPokemonIcons from "./PlannerPokemonIcons";
import SelectionControls from "./SelectionControls";


type ConnectionAccordionEntryProps = {
  parentEntityClass: EntityClass
  targetEntityClass: EntityClass
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
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
      className="planner__accordion-row"
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