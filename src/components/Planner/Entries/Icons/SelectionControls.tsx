import { BGAction, toggleBGPulse } from "../../../../hooks/App/BGManager";
import { ValidationFailureReason, } from "../../../../hooks/App/PokemonFilter";
import { SelectionAction } from "../../../../hooks/Planner/Selections";
import { PokemonIconDispatches } from "../../../App";
import Button from "../../../Reusables/Button/Button";
import './Icons.css';

type SelectionControlsProps = {
  dispatchSelection: React.Dispatch<SelectionAction>
  handleAddToCart: () => void,
  hasIcon: React.MutableRefObject<boolean>
  reason: React.MutableRefObject<ValidationFailureReason>

  dispatches: PokemonIconDispatches
}

const SelectionControls = ({
  dispatchSelection,
  handleAddToCart,
  hasIcon,
  reason,

  dispatches,
}: SelectionControlsProps) => {
  const noPokemon = !hasIcon.current;
  return (
    <div className="planner__control-buttons">
      <Button
        title='De-select all Pokemon in this box.'
        label='DESELECT ALL'

        active={true}
        onClick={e => {
          e.preventDefault();
          dispatchSelection({ type: 'remove_all' });
          dispatches.dispatchTeam({
            type: 'toggle_replace_mode',
            payload: null,
          });
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
          // TODO: no pulse if no pokemon selected
          toggleBGPulse(dispatches.dispatchBGManager);
          e.preventDefault();
          handleAddToCart();
        }}
        disabled={noPokemon}
        immediate={true}
      />
    </div>
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