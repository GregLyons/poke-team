import {
  NUMBER_OF_GENS,
} from "../../../utils/constants";
import {
  GenerationNum,
  stringToGenNumber,
} from "../../../types-queries/helpers";
import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";
import Slider from "../../Reusables/Slider";

type GenFilterFormProps = {
  genFilter: GenFilter,
  dispatchGenFilter: React.Dispatch<GenFilterAction>
}
const GenFilterForm = ({
  genFilter,
  dispatchGenFilter,
}: GenFilterFormProps) => {
  const handleGenSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchGenFilter({
      type: 'set_gen',
      payload: { gen: stringToGenNumber(e.target.value), },
    });
  }

  const onIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatchGenFilter({
      type: 'set_gen',
      payload: { gen: (Math.min(NUMBER_OF_GENS, genFilter.gen + 1) as GenerationNum) }
    });
  }

  const onDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatchGenFilter({
      type: 'set_gen',
      payload: { gen: (Math.max(1, genFilter.gen - 1) as GenerationNum) }
    });
  }

  const handleSwShSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchGenFilter({
      type: 'toggle_swsh'
    });
  }

  const handleBDSPSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchGenFilter({
      type: 'toggle_bdsp'
    });
  }

  console.log(genFilter.gen);

  return (
    <div className="control-panel__gen-slider-wrapper"
      style={{
        backgroundColor: "black"
      }}
    >
      <label htmlFor="select generation">
        <Slider
          min={1}
          max={NUMBER_OF_GENS}
          value={genFilter.gen}
          onChange={handleGenSelect}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onLeft={false}
          sliderWidth={'150px'}
          numericalWidth={1}
        />
      </label>
      <label htmlFor="select only moves and Pokemon in SwSh">
        <input
          type="checkbox"
          title={genFilter.gen !== 8 ? 'Irrelevant for other Gens' : 'Show only moves and Pokemon who are present in Sw/Sh in searches.'}
          checked={!genFilter.includeRemovedFromSwSh}
          onChange={handleSwShSelect}
          disabled={genFilter.gen !== 8}
        />
        Sw/Sh only
      </label>
      <label htmlFor="select only moves and Pokemon in BDSP">
        <input
          type="checkbox"
          title={genFilter.gen !== 8 ? 'Irrelevant for other Gens' : 'Show only moves and Pokemon who are present in BD/SP in searches.'}
          checked={!genFilter.includeRemovedFromBDSP}
          onChange={handleBDSPSelect}
          disabled={genFilter.gen !== 8}
        />
        BD/SP only
      </label>
      
    </div>
  );
};

export default GenFilterForm;