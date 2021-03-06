import { GenFilter, GenFilterAction } from "../../../hooks/App/GenFilter";
import { toGenNum } from "../../../types-queries/entities";
import {
  NUMBER_OF_GENS
} from "../../../utils/constants";
import Button from "../../Reusables/Button/Button";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
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
    <ErrorBoundary orientation="bottom" nudge="right">
      <form
        className="gen-filter__wrapper"
      >
        <div className="gen-filter__label">
          GEN
        </div>
        <fieldset className="gen-filter__slider">
          <legend className="hidden-label">Select gen</legend>
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
        </fieldset>
        <fieldset className="gen-filter__buttons">
          <legend className="hidden-label">Select version group, if applicable</legend>
          <label htmlFor="gen_filter_swsh" className="hidden-label">Sword/Shield filter</label>
          <Button
            id="gen_filter_swsh"
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
          <label htmlFor="gen_filter_bdsp" className="hidden-label">Brilliant Diamond/Shining Pearl filter</label>
          <Button
          id="gen_filter_bdsp"
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
        </fieldset>
      </form>
    </ErrorBoundary>
  );
};

export default GenFilterForm;