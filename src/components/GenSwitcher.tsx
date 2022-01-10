import { useContext } from "react";
import { GenContext } from "../contexts"
import { NUMBER_OF_GENS } from "../utils/constants";

const GenSwitcher = () => {
  const genContext = useContext(GenContext);
  
  return (
    <input
      type="range"
      min="1"
      max={NUMBER_OF_GENS}
      value={NUMBER_OF_GENS}
      onChange={(e) => {
        e.preventDefault();
        genContext.setGen(parseInt(e.target.value, 10));
      }}

      className="slider"
      id="gen-switch"
    />
  );
};

export default GenSwitcher;