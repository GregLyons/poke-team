import {
  SelectionAction,
} from "../../../hooks/hooks"

type SelectionControlsProps = {
  dispatchSelection: React.Dispatch<SelectionAction>
  handleAddToCart: () => void,
}

const SelectionControls = ({
  dispatchSelection,
  handleAddToCart,
}: SelectionControlsProps) => {
  return (
    <>
      <button onClick={() => dispatchSelection({ type: 'remove_all' })}>De-select all</button>
      {/* Placing 'Select all' next to 'Add to cart' to make 'Select all' -> 'Add to cart' easier. Place latter action to the right. */}
      <button onClick={() => dispatchSelection({ type: 'add_all' })}>Select all</button>
      <button onClick={() => handleAddToCart()}>Add to cart</button>
    </>
  );
} 

export default SelectionControls;