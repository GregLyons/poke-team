import { useCallback, useMemo } from "react";
import { SpeedControlKey, SpeedControlSummary, TypeCoverageSummary } from "../../../../types-queries/Analyzer/Coverage";
import { CoverageDatum, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";

type SpeedControlEntryProps = {
  speedControlKey: string
  coverageDatum: CoverageDatum
  
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const SpeedControlEntry = ({
  speedControlKey,
  coverageDatum,

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
  <div className="speed-control__entry">
    <div className="speed-control__name">
      {speedControlKey.charAt(0).toUpperCase() + speedControlKey.slice(1)}
    </div>
    <div
      className="speed-control__value"
      onMouseOver={onMouseOver(memberPSIDs)}
    >
      <span
        className={rankControlValue(total)}
      >
        {total}
      </span>
    </div>
  </div>
  )
};

export default SpeedControlEntry;