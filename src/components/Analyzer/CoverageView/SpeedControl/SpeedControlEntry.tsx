import { useCallback } from "react";
import { CoverageDatum, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";

type SpeedControlEntryProps = {
  speedControlKey: string
  coverageDatum: CoverageDatum

  rowIdx: number
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const SpeedControlEntry = ({
  speedControlKey,
  coverageDatum,

  rowIdx,

  onMouseOver,
  onMouseLeave,
}: SpeedControlEntryProps) => {
  const { memberPSIDs, total, } = coverageDatum;
 
  const rankControlValue = useCallback((total: number) => {
    if (total > 1) return 'good';
    else if (total > 0) return 'decent';
    else return '';
  }, []);

  return (
  <tr
    role="row"
    aria-rowindex={rowIdx + 2}
    className="speed-control__entry"
    onBlur={onMouseLeave}
    onMouseLeave={onMouseLeave}
  >
    <th
      scope="row"
      role="gridcell"
      aria-colindex={1}
      className="speed-control__name"
    >
      {speedControlKey.charAt(0).toUpperCase() + speedControlKey.slice(1)}
    </th>
    <td
      role="gridcell"
      aria-colindex={2}
      className="speed-control__value"
      onFocus={onMouseOver(memberPSIDs)}
      onMouseOver={onMouseOver(memberPSIDs)}
    >
      <button
        className={rankControlValue(total)}
      >
        {total}
      </button>
    </td>
  </tr>
  )
};

export default SpeedControlEntry;