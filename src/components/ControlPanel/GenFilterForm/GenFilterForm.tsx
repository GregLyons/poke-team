import {
  NUMBER_OF_GENS,
} from "../../../utils/constants";
import {
  GenerationNum,
  stringToGenNumber,
} from "../../../types-queries/helpers";
import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";
import Slider from "../../Reusables/Slider/Slider";

import './GenFilterForm.css';
import Button from "../../Reusables/Button/Button";

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

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) handleGenSelect(e);
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

  const handleSwShSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    dispatchGenFilter({
      type: 'toggle_swsh'
    });
  }

  const handleBDSPSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    dispatchGenFilter({
      type: 'toggle_bdsp'
    });
  }

  return (
    <form className="gen-filter__wrapper">
      <div className="gen-filter__slider">
        <div className="gen-filter__label">
          GEN
        </div>
        <label htmlFor="select generation">
          <Slider
            min={1}
            max={NUMBER_OF_GENS}
            value={genFilter.gen}
            onChange={handleGenSelect}
            onBlur={onBlur}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onLeft={false}
            sliderWidth={"clamp(75px, 7.5vw, 150px"}
            numericalWidth={1}
          />
        </label>
      </div>
      <div className="gen-filter__buttons">
        <label htmlFor="select only moves and Pokemon in SwSh">
          <Button
            title={genFilter.gen !== 8
              ? ''
              : genFilter.includeRemovedFromSwSh 
                ? 'Click to filter out Pokemon absent in SwSh.'
                : 'Click to include Pokemon removed from SwSh.'
            }
            active={!genFilter.includeRemovedFromSwSh || genFilter.gen !== 8}
            onClick={handleSwShSelect}
            disabled={genFilter.gen !== 8}
            label='Sw/Sh'
            immediate={false}
          />
        </label>
        <label htmlFor="select only moves and Pokemon in BDSP">
          <Button
            title={genFilter.gen !== 8 
              ? ''
              : genFilter.includeRemovedFromBDSP 
                ? 'Click to filter out Pokemon absent in BDSP.'
                : 'Click to include Pokemon removed from BDSP.'
            }
            active={!genFilter.includeRemovedFromBDSP || genFilter.gen !== 8}
            onClick={handleBDSPSelect}
            disabled={genFilter.gen !== 8}
            label='BD/SP'
            immediate={false}
          />
        </label>
      </div>
    </form>
  );
};

export default GenFilterForm;