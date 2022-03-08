import { useCallback, useMemo } from "react";
import { AbilityCoverageQuery, computeSpeedControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { Filters } from "../../../App";
import './SpeedControl.css';
import SpeedControlEntry from "./SpeedControlEntry";


type SpeedControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const SpeedControl = ({
  filters,

  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: SpeedControlProps) => {
  const speedControlMap = useMemo(() => {
    return computeSpeedControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
    );
  }, [abilityData, itemData, moveData, memberAndEntityPSIDs]);

  const rankControlValue = useCallback((total: number) => {
    if (total > 2) return 'great';
    if (total > 1) return 'good';
    if (total > 0) return 'decent';
    else return 'ok';
  }, []);
  
  return (
    <div
      className="speed-control__wrapper"
    >
      <div className="speed-control__entry">
        <div className="speed-control__name">
        </div>
        <div className="speed-control__value">
          #
        </div>
      </div>
      {(Object.entries(speedControlMap)).map(([speedControlKey, coverageDatum]) => (
        <SpeedControlEntry
          key={`speed_control_${speedControlKey}`}
          speedControlKey={speedControlKey}
          coverageDatum={coverageDatum}

          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  )
};

export default SpeedControl;