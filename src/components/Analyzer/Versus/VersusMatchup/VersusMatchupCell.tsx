import { useCallback, useMemo } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DamageMatchupResult } from "../../../../utils/damageCalc";

type VersusMatchupCellProps = {
  result: DamageMatchupResult | null

  onCellMouseOver: (rowIdx: number, colIdx: number) => (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) => void
  onCellMouseLeave: () => void

  rowIdx: number
  colIdx: number
  rowEmph: number | null
  colEmph: number | null
};

const VersusMatchupCell = ({
  result,
  onCellMouseOver,
  onCellMouseLeave,

  rowIdx,
  colIdx,
  rowEmph,
  colEmph,
}: VersusMatchupCellProps) => {
  const rateMatchup = useCallback(() => {
    
  }, [result]);

  // When hovering over cell, highlight the user/enemy members, and the relevant moves
  const relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject } | null = useMemo(() => {
    if (result === null) return null;
    
    const userPSID = result.userPSID;
    const userMovePSIDs: string[] = result.userToEnemy.moveInfo.map(([movePSID, display]) => movePSID);

    const enemyPSID = result.enemyPSID;
    const enemyMovePSIDs: string[] = result.enemyToUser.moveInfo.map(([movePSID, display]) => movePSID);

    return {
      user: {
        [userPSID]: userMovePSIDs,
      },
      enemy: {
        [enemyPSID]: enemyMovePSIDs,
      },
    };
  }, [result]);

  const emphasizeCell: boolean = useMemo(() => {
    // User is hovering over cell
    if (rowEmph === rowIdx && colEmph === colIdx) return true;

    // User is hovering over icon of row to which this cell belongs
    if (rowEmph === rowIdx && colEmph === null) return true;

    // User is hovering over icon of column to which this cell belongs
    if (rowEmph === null && colEmph === colIdx) return true;

    return false;
  }, [rowIdx, colIdx, rowEmph, colEmph]);
  
  return (
    <div
      className={`
        versus-matchup__cell
        ${emphasizeCell
          ? '--emph'
          : ''
        }
      `}
      onMouseOver={onCellMouseOver(rowIdx, colIdx)(relevantNames)}
      onFocus={onCellMouseOver(rowIdx, colIdx)(relevantNames)}
      onMouseLeave={onCellMouseLeave}
      onBlur={onCellMouseLeave}
    >
      <div
        className="versus-matchup__user-to-enemy"
        title={result?.userToEnemy.moveInfo.map(([movePSID, display]) => display).join('\n') || 'Cannot do damage.'}
      >
        You: {result?.userToEnemy.minHits}
      </div>
      <div
        className="versus-matchup__enemy-to-user"
        title={result?.enemyToUser.moveInfo.map(([movePSID, display]) => display).join('\n') || 'Cannot do damage.'}
      >
        Them: {result?.enemyToUser.minHits}
      </div>
      <div className="versus-matchup__outspeed">
        {result?.outSpeed ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default VersusMatchupCell;