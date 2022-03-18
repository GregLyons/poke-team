import {
  Fragment,
  useRef
} from "react";
import { useEntryExpand } from "../../../../hooks/Planner/Entries";
import { selectionToPokemonIconData, useSelection } from "../../../../hooks/Planner/Selections";
import {
  EntityClass
} from "../../../../utils/constants";
import { EntryIconData } from "../../helpers";
import EntryLink from "../EntryLink";
import PlannerPokemonIcons from "../Icons/PlannerPokemonIcons";
import './ConnectionEntry.css';

type ConnectionAccordionEntryProps = {
  parentEntityClass: EntityClass
  targetEntityClass: EntityClass
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
  name,
  linkName,
  description,
  data,
  icons,
}: ConnectionAccordionEntryProps) => {
  // Changing scroll height 
  // #region

  // Ref for component
  const entryRef = useRef<HTMLLIElement>(null);

  // Default height
  const entryHeight = "6rem";
  
  const { entryHover, expandHover, expand, hoverListeners, expandListeners, originalScrollHeight, } = useEntryExpand(entryRef, icons?.filters);

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
    if (!icons || !icons.dispatches || !icons.filters || !icons.cartNote) return;
    icons.dispatches.dispatchCart({
      type: 'add_pokemon',
      payload: {
        gen: icons.filters.genFilter.gen,
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
    <li
      ref={entryRef}
      onMouseEnter={hoverListeners.onMouseEnter}
      onMouseLeave={() => {
        hoverListeners.onMouseLeave();
        expandListeners.onMouseLeave();
      }}
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
      className={`
        planner-accordion__entry
        ${expandHover 
          ? 'planner-accordion__entry--expand-hover' 
          : ''
        }
      `}
    >
      <EntryLink
        hover={entryHover}
        parentEntityClass={parentEntityClass}
        targetEntityClass={targetEntityClass}
        linkName={linkName}
        name={name}
        icons={icons}
      />

      <dl 
        onMouseEnter={expandListeners.onMouseEnter}
        onMouseLeave={() => {
          // If haven't expanded yet, then leaving will prevent the expand
          if (!expand) expandListeners.onMouseLeave();
        }}
        className="planner-accordion__entry-data"
      >
        {data && data.map(({key, title, value}) => (
          <Fragment key={key}>
            <dt 
              className="planner-accordion__entry-data-key"
              title={title}
            >
              {key}
            </dt>
            <dd className="planner-accordion__entry-data-value">
              {value}
            </dd>
          </Fragment>
        ))}
      </dl>

      <div
        onMouseEnter={expandListeners.onMouseEnter}
        onMouseLeave={() => {
          // If haven't expanded yet, then leaving will prevent the expand
          if (!expand) expandListeners.onMouseLeave();
        }}
        className="planner-accordion__entry-description"
      >
        {description}
      </div>

      {icons && <PlannerPokemonIcons
        context="accordion"
        expandListeners={expandListeners}
        expand={expand}
        selection={selection}
        dispatchSelection={dispatchSelection}
        toggleSelection={toggleSelection}
        icons={icons}
        handleAddToCart={handleAddToCart}
      />}
    </li>
  );
}

export default ConnectionAccordionEntry;