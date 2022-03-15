import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";
import { toGenNum } from "../../../types-queries/entities";
import {
  NUMBER_OF_GENS
} from "../../../utils/constants";
import Button from "../../Reusables/Button/Button";
import Slider from "../../Reusables/Slider/Slider";
import './GenFilterForm.css';


type GenFilterFormProps = {
  genFilter: GenFilter,
  dispatchGenFilter: React.Dispatch<GenFilterAction>
}
const GenFilterForm = ({
  genFilter,
  dispatchGenFilter,
}: GenFilterFormProps) => {
  const updateGen = (newGen: number) => {
    dispatchGenFilter({
      type: 'set_gen',
      payload: { gen: toGenNum(newGen + ''), },
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
    <form
      className="gen-filter__wrapper"
    >
      <div className="gen-filter__label">
        GEN
      </div>
      <div className="gen-filter__slider">
        <label htmlFor="Select generation">
          <Slider
            titleFor="Generation"
            min={1}
            max={NUMBER_OF_GENS}
            value={genFilter.gen}
            updateValue={updateGen}
            onLeft={false}
            sliderWidth={"clamp(75px, 10vw, 200px"}
            numericalWidth={1}
          />
        </label>
      </div>
      <div className="gen-filter__buttons">
        <label htmlFor="Select only moves and Pokemon in SwSh">
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
        <label htmlFor="Select only moves and Pokemon in BDSP">
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