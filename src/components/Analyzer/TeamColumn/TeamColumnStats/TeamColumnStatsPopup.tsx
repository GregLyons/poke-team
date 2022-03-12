import { useMemo } from "react";
import { BASE_STAT_NAMES } from "../../../../hooks/App/PokemonFilter";
import { BaseStatName, GenNum, StatTable, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../../types-queries/entities";
import Slider from "../../../Reusables/Slider/Slider";

type TeamColumnStatsPopupProps = {
  updateEV: (statName: BaseStatName) => (newValue: number) => void
  evs: StatTable
  updateIV: (statName: BaseStatName) => (newValue: number) => void
  ivs: StatTable
  gen: GenNum
};

const TeamColumnStatsPopup = ({
  updateEV,
  evs,
  updateIV,
  ivs,
  gen,
}: TeamColumnStatsPopupProps) => {
  const spreadObj: { [baseStatName in BaseStatName]: { ev: number, iv: number, }} = useMemo(() => {
    let spreadObj: { [baseStatName in BaseStatName]: { ev: number, iv: number, }}= {
      hp: {
        ev: 0,
        iv: 0,
      },
      attack: {
        ev: 0,
        iv: 0,
      },
      defense: {
        ev: 0,
        iv: 0,
      },
      specialAttack: {
        ev: 0,
        iv: 0,
      },
      specialDefense: {
        ev: 0,
        iv: 0,
      },
      speed: {
        ev: 0,
        iv: 0,
      },
    };
    
    for (let baseStatName of BASE_STAT_NAMES) {
      spreadObj[baseStatName] = {
        ev: evs[baseStatName],
        iv: ivs[baseStatName],
      };
    }

    return spreadObj;
  }, [evs, ivs]);
  return (
    <div className="stat-popup__wrapper">
      {Object.entries(spreadObj).map(([key, value]) => {
        // Type guard
        const statName = (key as BaseStatName)
        if(!statName) return;

        const { ev, iv } = value;
        const ivOrDV = gen > 2
          ? 'IV'
          : 'DV';
        const abbrStatName = toAbbreviatedBaseStatName(statName);
        const formStatName = toFormattedBaseStatName(statName);

        return (
          <div
            key={statName}
            className="stat-popup__stat-wrapper"
          >
            <div className="stat-popup__stat-label">
              {abbrStatName.length === 3
                ? <>{abbrStatName}</>
                : <>{abbrStatName}&nbsp;</>
              }
            </div>
            <div className="stat-popup__input">
              <Slider
                titleFor={`${formStatName} EV`}
                min={0}
                max={252}
                value={ev}
                updateValue={updateEV(statName)}
                sliderWidth={'200px'}
                numericalWidth={3}
                step={4}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default TeamColumnStatsPopup;