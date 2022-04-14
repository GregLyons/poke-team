import { TeamAction } from "../../../hooks/App/Team";
import { BaseStatName, StatTable, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../types-queries/entities";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import Popup from "../../Reusables/Popup/Popup";
import Slider from "../../Reusables/Slider/Slider";

type TeamColumnSpreadProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number
  popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  }

  spreadFor: 'EV' | 'IV' | 'DV'
  spread: StatTable

  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
}

const TeamColumnSpread = ({
  teamDispatch,
  filters,

  member,
  memberIdx,
  popupPositioning,

  spreadFor,
  spread,

  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnSpreadProps) => {
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
  
  const updateSpread = (statName: BaseStatName, newValue: number) => {
    spreadFor === 'EV'
      ? teamDispatch({
          type: 'assign_ev',
          payload: {
            gen: filters.genFilter.gen,
            idx: memberIdx,
            stat: statName,
            newValue,
          }
        })
      : teamDispatch({
          type: 'assign_iv',
          payload: {
            gen: filters.genFilter.gen,
            idx: memberIdx,
            stat: statName,
            newValue,
          }
        });
  };
  
  return (
    <Popup
      triggerID={`popup_trigger_${memberIdx}_${spreadFor}`}
      trigger={<div
        className={`
          team-column__text
          ${determineRelevance(spreadFor)}
        `}
        onClick={onEntityClick(member.psID, spreadFor)}
      >
        {spreadFor + 's'}
      </div>
      }
      content={<div
        className={`
          popup-spread
        `}
      >
        {Object.entries(spread).map(([key, value]) => {
          // Type guard
          const statName = (key as BaseStatName);
          if (!statName) return;
          const abbrStatName = toAbbreviatedBaseStatName(statName);
          const formStatName = toFormattedBaseStatName(statName);
          
          return (
            <div
              key={statName}
              className="popup-spread__slider-wrapper"
            >
              <div className="popup-spread__slider-label">
                {abbrStatName.length === 3
                  ? <>{abbrStatName}&nbsp;&nbsp;</>
                  : <>{abbrStatName}&nbsp;&nbsp;&nbsp;</>
                }
              </div>
              <div className="popup-spread__slider">
                <Slider
                  titleFor={formStatName + ' ' + spreadFor}
                  min={min}
                  max={max}
                  value={value}
                  updateValue={spreadFor === 'EV'
                    ? (newValue: number) => updateSpread(statName, newValue)
                    : (newValue: number) => updateSpread(statName, newValue)
                  }
                  sliderWidth={'150px'}
                  numericalWidth={3}
                  step={spreadFor === 'EV' ? 4 : 1}
                />
                {/* Show StatExp in Gens 1 and 2 */}
                {member.gen < 3 && spreadFor === 'EV'
                  ? <span style={{
                      minWidth: '7ch',
                      textAlign: 'right',
                    }}>
                      &nbsp;&nbsp;{value * value}
                    </span>
                  : ''
                }
              </div>
            </div>
          )
        })}
      </div>}
      {...popupPositioning}

      onClose={onPopupClose}
    />
  );
};

export default TeamColumnSpread;