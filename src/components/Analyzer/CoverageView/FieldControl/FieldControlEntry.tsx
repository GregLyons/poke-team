import { useCallback, useMemo } from "react";
import { FieldControlSummary, TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { FieldStateClass, FIELDSTATE_CLASS_MAP, TypeName } from "../../../../types-queries/helpers";
import TypeIcon from "../../../Icons/TypeIcon";

type FieldControlEntryProps = {
  fieldStateClass: FieldStateClass
  summary: FieldControlSummary
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const FieldControlEntry = ({
  fieldStateClass,
  summary,

  onMouseOver,
  onMouseLeave,
}: FieldControlEntryProps) => {
  const { create, resist } = summary;
 
  const rankControlValue = useCallback((total: number, label: keyof FieldControlSummary) => {
    switch(label) {
      case 'create':
        if (total > 1) return 'great';
        if (total > 0) return 'good';
        else return '';
      case 'resist':
        if (total > 1) return 'great';
        if (total > 0) return 'good';
        else return '';
      default:
        return '';
    }
  }, []);

  return (
  <div
    className="field-control__entry"
    onMouseLeave={onMouseLeave}
  >
    <div className="field-control__name">
      {FIELDSTATE_CLASS_MAP.get(fieldStateClass)?.replace('Entry hazard', 'Hazards')}
    </div>
    <div
      className="field-control__create"
      onMouseOver={onMouseOver(create.memberPSIDs)}
    >
      <span
        className={rankControlValue(create.total, 'create')}
      >
        {create.total}
      </span>
    </div>
    <div
      className="field-control__resist"
      onMouseOver={onMouseOver(resist.memberPSIDs)}
    >
      <span
        className={rankControlValue(resist.total, 'resist')}
      >
        {resist.total}
      </span>
    </div>
  </div>
  )
};

export default FieldControlEntry;