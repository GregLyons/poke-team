import { useCallback } from "react";
import { StatusControlSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { StatusName, STATUS_MAP } from "../../../../types-queries/entities";
import StatusIcon from "../../../Icons/StatusIcon";

type StatusControlEntryProps = {
  statusName: StatusName
  summary: StatusControlSummary

  rowIdx: number
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const StatusControlEntry = ({
  statusName,
  summary,

  rowIdx,

  onMouseOver,
  onMouseLeave,
}: StatusControlEntryProps) => {
  const { cause, resist } = summary;
 
  const rankControlValue = useCallback((total: number, label: keyof StatusControlSummary) => {
    switch(label) {
      case 'cause':
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
    className="status-control__entry"
    onMouseLeave={onMouseLeave}
  >
    <th
      scope="row"
      role="gridcell"
      aria-colindex={1}
      className="status-control__name"
    >
      <StatusIcon
        iconDatum={{
          name: statusName,
          formattedName: STATUS_MAP.get(statusName) || '',
        }}
      />
      {STATUS_MAP.get(statusName) || ''}
    </th>
    <td
      role="gridcell"
      aria-colindex={2}
      className="status-control__cause"
      onFocus={onMouseOver(cause.memberPSIDs)}
      onMouseOver={onMouseOver(cause.memberPSIDs)}
    >
      <a
        className={rankControlValue(cause.total, 'cause')}
      >
        {cause.total}
      </a>
    </td>
    <td
      role="gridcell"
      aria-colindex={3}
      className="status-control__resist"
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

export default StatusControlEntry;