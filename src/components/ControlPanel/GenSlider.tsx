import {
  GEN_ARRAY,
  NUMBER_OF_GENS,
} from "../../utils/constants";
import {
  GenerationNum,
} from "../../types-queries/helpers";
import { GenFilter } from "../../hooks/app-hooks";
import Dropdown from "../Forms/Dropdown";
import { useState } from "react";

type GenDropdownProps = {
  genFilter: GenFilter,
  selectGen: (gen: GenerationNum) => void
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
    label: 'Generation ' + gen,
    selected: gen === 8,
  }
});

const GenDropdown = ({
  genFilter,
  selectGen,
}: GenDropdownProps) => {
  const [genItems, setGenItems] = useState<GenItem[]>(DEFAULT_GEN_ITEMS);

  const handleGenSelect = (selectedGenItemID: GenItemID) => {
    selectGen(selectedGenItemID);
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