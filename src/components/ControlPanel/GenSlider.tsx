import {
  NUMBER_OF_GENS,
} from "../../utils/constants";
import {
  GenerationNum,
} from "../../types-queries/helpers";
import { GenFilter } from "../../hooks/app-hooks";

type GenSliderProps = {
  genFilter: GenFilter,
  handleGenSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const GenSlider = ({ genFilter, handleGenSliderChange}: GenSliderProps) => {

  return (
    <div className="control-panel__gen-slider-wrapper">
      <form action="">
        <label>
          <input
            type="range"
            min="1"
            max={NUMBER_OF_GENS}
            value={genFilter.gen}
            onChange={handleGenSliderChange}
          />
          {genFilter.gen}
        </label>
        <br />
        <label>
          Include Pokemon removed from Gen 8
        </label>
      </form>
    </div>
  );
};

export default GenSlider;