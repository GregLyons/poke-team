import { useContext } from "react";
import { GenContext } from "../contexts"
import { NUMBER_OF_GENS } from "../utils/constants";

import {
  GenerationNum,
  stringToGenNumber,
} from "../typeDefs/Generation";

const GenSwitcher = () => {
  const genContext = useContext(GenContext);

  return (
    <input
      type="range"
      min="1"
      max={NUMBER_OF_GENS}
      value={genContext.gen}
      onChange={(e) => {
        e.preventDefault();
        genContext.setGen(stringToGenNumber(e.target.value));
      }}

      className="slider"
      id="gen-switch"
    />
  );
};

export default GenSwitcher;