import {
  NUMBER_OF_GENS,
} from "../../../utils/constants";
import {
  stringToGenNumber,
} from "../../../types-queries/helpers";
import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";

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

  return (
    <div className="control-panel__gen-slider-wrapper">
      <label htmlFor="select generation">
        <input 
          type="range"
          value={genFilter.gen}
          min="1"
          max={NUMBER_OF_GENS}
          onChange={handleGenSelect}
        />
        {genFilter.gen}
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