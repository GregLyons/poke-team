import {
  SelectionAction,
} from "../../../hooks/hooks"

type SelectionControlsProps = {
  dispatchSelection: React.Dispatch<SelectionAction>
}

const SelectionControls = ({
  dispatchSelection,
}: SelectionControlsProps) => {
  return (
    <>
      <button onClick={() => dispatchSelection({ type: 'add_all' })}>Select all</button>
      <button onClick={() => dispatchSelection({ type: 'remove_all' })}>De-select all</button>
      <button>Add to cart</button>
    </>
  );
} 

export default SelectionControls;