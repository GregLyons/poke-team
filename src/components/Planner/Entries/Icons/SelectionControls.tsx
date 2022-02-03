import { SelectionAction } from "../../../../hooks/Planner/Selections";
import Button from "../../../Reusables/Button/Button";
import { EntryIconData } from "../../helpers";

import './Icons.css';

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
            <div className="planner__control-buttons">
              <Button
                title='De-select all Pokemon in this box.'
                label='DESELECT ALL'

                active={true}
                onClick={e => {
                  e.preventDefault();
                  dispatchSelection({ type: 'remove_all' });
                }}
                disabled={false}
                immediate={true}
              />
              {/* Placing 'Select all' next to 'Add to cart' to make 'Select all' -> 'Add to cart' easier. Place latter action to the right. */}
              <Button
                title='Select all Pokemon in this box.'
                label='SELECT ALL'

                active={true}
                onClick={e => {
                  e.preventDefault();
                  dispatchSelection({ type: 'add_all' });
                }}
                disabled={false}
                immediate={true}
              />
              <Button
                title='Save the selected Pokemon to a box.'
                label='SAVE TO BOX'

                active={true}
                onClick={e => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                disabled={false}
                immediate={true}
              />
            </div>
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