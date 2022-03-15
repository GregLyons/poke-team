import { spreadSummary } from "../../../../../types-queries/Builder/helpers";
import { BaseStatName, StatTable, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../../../types-queries/entities";
import Slider from "../../../../Reusables/Slider/Slider";
import { SpreadHandlers } from "../../TeamView";
import './SpreadView.css';


type SpreadViewProps = {
  handlers: SpreadHandlers
  spread: StatTable
  spreadFor: 'EV' | 'IV' | 'DV'
}

const SpreadView = ({
  handlers,
  spread,
  spreadFor,
}: SpreadViewProps) => {
  const min = 0;
  let max: number;
  let defaultValue: number;
  switch(spreadFor) {
    case 'EV':
      max = 252;
      defaultValue = 0;
      break;
    case 'IV':
      max = 31;
      defaultValue = 31;
      break;
    case 'DV':
      max = 15;
      defaultValue = 15;
      break;
  }
  return (
    <div className="spread-view__wrapper">
      <div className="spread-view__header">{spreadFor} spread</div>
      <div className="spread-view__sliders">
        {Object.entries(spread).map(([key, value]) => {
          // Type guard
          const statName = (key as BaseStatName);
          if (!statName) return <></>;
          const abbrStatName = toAbbreviatedBaseStatName(statName);
          const formStatName = toFormattedBaseStatName(statName);
          
          return (
            <div
              key={statName}
              className={`spread-view__slider-wrapper`}
            >
              <div className="spread-view__slider-label">
                {abbrStatName.length === 3
                  ? <>{abbrStatName}&nbsp;&nbsp;</>
                  : <>{abbrStatName}&nbsp;&nbsp;&nbsp;</>
                }
              </div>
              <div className="spread-view__slider">
                <Slider
                  titleFor={formStatName + ' ' + spreadFor}
                  min={min}
                  max={max}
                  value={value}
                  updateValue={spreadFor === 'EV'
                    ? (newValue: number) => handlers.updateEV(statName, newValue)
                    : (newValue: number) => handlers.updateIV(statName, newValue)
                  }
                  sliderWidth={'200px'}
                  numericalWidth={3}
                  step={spreadFor === 'EV' ? 4 : 1}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="spread-view__summary">
        {spreadSummary(spread, defaultValue)}
      </div>
    </div>
  )
};

export default SpreadView;