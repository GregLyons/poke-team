import {
  NUMBER_OF_GENS,
} from "../../utils/constants";
import {
  GenerationNum,
} from "../../types-queries/helpers";

type GenSliderProps = {
  gen: GenerationNum,
  handleGenSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const GenSlider = ({ gen, handleGenSliderChange}: GenSliderProps) => {

  return (
    <div className="control-panel__gen-slider-wrapper">
      <form action="">
        <label>
          <input
            type="range"
            min="1"
            max={NUMBER_OF_GENS}
            value={gen}
            onChange={handleGenSliderChange}
          />
          {gen}
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