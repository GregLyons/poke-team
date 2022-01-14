import { NUMBER_OF_GENS } from "../utils/constants";

import {
  GenerationNum,
} from "../types-queries/Generation";

type GenSliderProps = {
  gen: GenerationNum,
  handleGenSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const GenSlider = ({ gen, handleGenSliderChange}: GenSliderProps) => {

  return (
    <>
      <input
        type="range"
        min="1"
        max={NUMBER_OF_GENS}
        value={gen}
        onChange={handleGenSliderChange}

        className="slider"
        id="gen-slider"
      />
      {gen}
    </>
  );
};

export default GenSlider;