import { useCallback } from "react";
import { FieldControlSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { FieldStateClass, FIELDSTATE_CLASS_MAP } from "../../../../types-queries/entities";

type FieldControlEntryProps = {
  fieldStateClass: FieldStateClass
  summary: FieldControlSummary

  rowIdx: number
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const FieldControlEntry = ({
  fieldStateClass,
  summary,

  rowIdx,

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
  <tr
    role="row"
    aria-rowindex={rowIdx + 2}
    className="field-control__entry"
    onMouseLeave={onMouseLeave}
    onBlur={onMouseLeave}
  >
    <th
      scope="row"
      role="gridcell"
      aria-colindex={1}
      className="field-control__name"
    >
      {FIELDSTATE_CLASS_MAP.get(fieldStateClass)?.replace('Entry hazard', 'Hazards')}
    </th>
    <td
      role="gridcell"
      aria-colindex={2}
      className="field-control__create"
      onFocus={onMouseOver(create.memberPSIDs)}
      onMouseOver={onMouseOver(create.memberPSIDs)}
    >
      <a
        className={rankControlValue(create.total, 'create')}
      >
        {create.total}
      </a>
    </td>
    <td
      role="gridcell"
      aria-colindex={3}
      className="field-control__resist"
      onFocus={onMouseOver(resist.memberPSIDs)}
      onMouseOver={onMouseOver(resist.memberPSIDs)}
    >
      <a
        className={rankControlValue(resist.total, 'resist')}
      >
        {resist.total}
      </a>
    </td>
  </tr>
  )
};

export default FieldControlEntry;