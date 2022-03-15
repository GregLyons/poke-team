import { toggleBGPulse } from "../../../../hooks/App/BGManager";
import { Selection, SelectionAction } from "../../../../hooks/Planner/Selections";
import { Dispatches } from "../../../App";
import Button from "../../../Reusables/Button/Button";
import './Icons.css';

type SelectionControlsProps = {
  selection: Selection
  dispatchSelection: React.Dispatch<SelectionAction>
  handleAddToCart: () => void,
  hasIcon: React.MutableRefObject<boolean>

  dispatches: Dispatches
}

const SelectionControls = ({
  selection,
  dispatchSelection,
  handleAddToCart,
  hasIcon,

  dispatches,
}: SelectionControlsProps) => {
  const noPokemon = !hasIcon.current;
  return (
    <>
      <Button
        title='De-select all Pokemon in this box.'
        label='DESELECT ALL'

        active={true}
        onClick={e => {
          e.preventDefault();
          dispatchSelection({ type: 'remove_all' });
        }}
        disabled={noPokemon}
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
        disabled={noPokemon}
        immediate={true}
      />
      <Button
        title='Save the selected Pokemon to a box.'
        label='SAVE TO BOX'

        active={true}
        onClick={e => {
          e.preventDefault();
          
          // Pulse if there are any Pokemon selected
          let pulsed = false;
          for (let value of Object.values(selection)) {
            if (pulsed) return;
            if (value.selected) {
              pulsed = true;
              toggleBGPulse(dispatches.dispatchBGManager);
            }
            return;
          };
          
          handleAddToCart();
        }}
        disabled={noPokemon}
        immediate={true}
      />
    </>
  );
}


export default SelectionControls;


// : icons 
//           // Entry has icon data
//           ? icons.itemIconDatum 
//             // Item icon entry
//             ? icons.pokemonIconData.length
//               // Item has Pokemon requirements, so Pokemon icons not rendering due to tier filter
//               ? <div className="planner__selection-controls--reason">None of the item's required Pokemon are in this tier.</div>
//               // Item doesn't have Pokemon requirements, so no Pokemon icons to render.
//               : <div className="planner__selection-controls--reason">No Pokemon requirements.</div>
//             // Not item icon entry, so Pokemon icons not rendering due to tier filter
//             : <div className="planner__selection-controls--reason">No Pokemon in this tier.</div>
//           // Entry has no icon data (e.g. target entity is Stat, Status, etc.)
//           : ''