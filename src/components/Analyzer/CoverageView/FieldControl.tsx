import { useMemo } from "react";
import { AbilityCoverageQuery, computeFieldControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Filters } from "../../App";

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
  
  return (
    <div>FieldControl</div>
  )
};

export default FieldControl;