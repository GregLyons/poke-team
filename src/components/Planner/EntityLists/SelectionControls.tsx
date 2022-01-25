import {
  SelectionAction,
} from "../../../hooks/planner-hooks"
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/smogonLogic";
import { CartAction, TeamAction } from "../../../hooks/app-hooks";
import { EntryIconData } from "./helpers";

type SelectionControlsProps = {
  dispatchSelection: React.Dispatch<SelectionAction>
  handleAddToCart: () => void,
  hasIcon: React.MutableRefObject<boolean>
  icons: EntryIconData
}

const SelectionControls = ({
  dispatchSelection,
  handleAddToCart,
  hasIcon,
  icons,
}: SelectionControlsProps) => {
  return (
    <>
      {hasIcon.current 
        // Entry has icons to render, so render cart controls
        ? (
            <>
              <button onClick={() => dispatchSelection({ type: 'remove_all' })}>De-select all</button>
              {/* Placing 'Select all' next to 'Add to cart' to make 'Select all' -> 'Add to cart' easier. Place latter action to the right. */}
              <button onClick={() => dispatchSelection({ type: 'add_all' })}>Select all</button>
              <button onClick={() => handleAddToCart()}>Add to cart</button>
            </>
          )
        : icons 
          // Entry has icon data
          ? icons.itemIconDatum 
            // Item icon entry
            ? icons.pokemonIconData.length
              // Item has Pokemon requirements, so Pokemon icons not rendering due to tier filter
              ? <div className="planner__selection-controls--reason">None of the item's required Pokemon are in this tier.</div>
              // Item doesn't have Pokemon requirements, so no Pokemon icons to render.
              : <div className="planner__selection-controls--reason">No Pokemon requirements.</div>
            // Not item icon entry, so Pokemon icons not rendering due to tier filter
            : <div className="planner__selection-controls--reason">No Pokemon in this tier.</div>
          // Entry has no icon data (e.g. target entity is Stat, Status, etc.)
          : ''
      }
    </>
  );
} 

export default SelectionControls;