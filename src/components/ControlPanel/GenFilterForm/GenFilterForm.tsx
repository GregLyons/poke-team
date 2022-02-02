import {
  NUMBER_OF_GENS,
} from "../../../utils/constants";
import {
  GenerationNum,
  stringToGenNumber,
} from "../../../types-queries/helpers";
import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";
import Slider from "../../Reusables/Slider";

import './GenFilter.css';

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

  const handleSwShSelect = () => {
    dispatchGenFilter({
      type: 'toggle_swsh'
    });
  }

  const handleBDSPSelect = () => {
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
          <button
            title={genFilter.gen !== 8 
              ? ''
              : genFilter.includeRemovedFromSwSh 
                ? 'Click to filter out Pokemon absent in SwSh.'
                : 'Click to include Pokemon removed from SwSh.'
            }
            className={`
              gen-filter__button 
              ${genFilter.includeRemovedFromSwSh && genFilter.gen === 8 
                ? ''
                : 'gen-filter__button--active'}
            `}
            onClick={handleSwShSelect}
            disabled={genFilter.gen !== 8}
          >
            Sw/Sh
          </button>
        </label>
        <label htmlFor="select only moves and Pokemon in BDSP">
          <button
            title={genFilter.gen !== 8 
              ? ''
              : genFilter.includeRemovedFromBDSP 
                ? 'Click to filter out Pokemon absent in BDSP.'
                : 'Click to include Pokemon removed from BDSP.'
            }
            className={`
            gen-filter__button 
            ${genFilter.includeRemovedFromBDSP && genFilter.gen === 8 
              ? ''
              : 'gen-filter__button--active'}
            `}
            onClick={handleBDSPSelect}
            disabled={genFilter.gen !== 8}
          >
            BD/SP
          </button>
        </label>
      </div>
    </form>
  );
};

export default GenFilterForm;