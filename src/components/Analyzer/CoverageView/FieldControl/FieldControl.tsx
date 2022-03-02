import { useCallback, useMemo } from "react";
import { AbilityCoverageQuery, computeFieldControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { FIELDSTATE_CLASS_MAP } from "../../../../types-queries/helpers";
import { Filters } from "../../../App";

type FieldControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const FieldControl = ({
  filters,
  
  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: FieldControlProps) => {
  const fieldControlMap = useMemo(() => {
    return computeFieldControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
      filters.genFilter.gen,
    );
  }, [abilityData, itemData, moveData, filters, memberAndEntityPSIDs]);

  const rankControlValue = useCallback((total: number) => {
    if (total > 1) return 'great';
    if (total > 0) return 'good';
    else return 'ok';
  }, []);
  
  return (
    <div className="field-control__wrapper">
      {Array.from(fieldControlMap.entries()).map(([fieldStateClass, controlDatum]) => (
        <div
          key={`field-control_${fieldStateClass}_entry`}
          className="field-control__entry"
          onMouseLeave={onMouseLeave}
        >
          <div className="field-control__name">
            {FIELDSTATE_CLASS_MAP.get(fieldStateClass)}
          </div>
          <div
            className="field-control__value"
            onMouseOver={onMouseOver(controlDatum.memberPSIDs)}
          >
            <span
              className={rankControlValue(controlDatum.total)}
            >
              {controlDatum.total}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
};

export default FieldControl;