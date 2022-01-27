import {
  GEN_ARRAY,
  NUMBER_OF_GENS,
} from "../../utils/constants";
import {
  GenerationNum,
} from "../../types-queries/helpers";
import { GenFilter, GenFilterAction } from "../../hooks/app-hooks";
import Dropdown from "../Forms/Dropdown";
import { useState } from "react";

type GenDropdownProps = {
  genFilter: GenFilter,
  dispatchGenFilter: React.Dispatch<GenFilterAction>
}

type GenItemID = GenerationNum;

type GenItem = {
  id: GenerationNum
  label: string
  selected: boolean
}

const DEFAULT_GEN_ITEMS: GenItem[] = GEN_ARRAY.map(gen => {
  return {
    id: gen,
    label: 'Gen ' + gen,
    selected: gen === 8,
  }
});

const GenDropdown = ({
  genFilter,
  dispatchGenFilter: dispatchGenFilter,
}: GenDropdownProps) => {
  const [genItems, setGenItems] = useState<GenItem[]>(DEFAULT_GEN_ITEMS);

  const handleGenSelect = (selectedGenItemID: GenItemID) => {
    dispatchGenFilter({
      type: 'set_gen',
      payload: { gen: selectedGenItemID },
    });
    setGenItems(genItems.map(genItem => {
      return {
        ...genItem,
        selected: genItem.id === selectedGenItemID,
      }
    }));
  }

  return (
    <div className="control-panel__gen-slider-wrapper">
      <form action="">
        <Dropdown
          title={'Select gen'}
          items={genItems}
          toggleSelect={handleGenSelect}
        />
      </form>
    </div>
  );
};

export default GenDropdown;