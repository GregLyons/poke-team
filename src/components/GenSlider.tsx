import {
  useContext,
  useEffect,
  useRef,
} from "react";
import { GenContext } from "../contexts"
import { NUMBER_OF_GENS } from "../utils/constants";

import {
  GenerationNum,
  stringToGenNumber,
} from "../types-queries/Generation";

type GenSliderProps = {
  value: GenerationNum,
  handleGenSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const GenSlider = ({ value, handleGenSliderChange}: GenSliderProps) => {

  const { gen } = useContext(GenContext);
  return (
    <input
      type="range"
      min="1"
      max={NUMBER_OF_GENS}
      value={gen}
      onChange={handleGenSliderChange}

      className="slider"
      id="gen-slider"
    />
  );
};

export default GenSlider;