import { useCallback } from "react";
import { StatusControlSummary } from "../../../../types-queries/Analyzer/Coverage";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { StatusName, STATUS_MAP } from "../../../../types-queries/entities";
import StatusIcon from "../../../Icons/StatusIcon";

type StatusControlEntryProps = {
  statusName: StatusName
  summary: StatusControlSummary
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const StatusControlEntry = ({
  statusName,
  summary,

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
  <div
    className="status-control__entry"
    onMouseLeave={onMouseLeave}
  >
    <div className="status-control__icon">
      <StatusIcon
        iconDatum={{
          name: statusName,
          formattedName: STATUS_MAP.get(statusName) || '',
        }}
      />
    </div>
    <div className="status-control__name">
      {STATUS_MAP.get(statusName) || ''}
    </div>
    <div
      className="status-control__cause"
      onMouseOver={onMouseOver(cause.memberPSIDs)}
    >
      <span
        className={rankControlValue(cause.total, 'cause')}
      >
        {cause.total}
      </span>
    </div>
    <div
      className="status-control__resist"
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

export default StatusControlEntry;