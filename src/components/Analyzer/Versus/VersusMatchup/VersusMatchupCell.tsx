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

  const userToEnemyGuaranteed: string = useMemo(() => {
    if (result === null) return '';

    if ([0, 10].includes(result.userToEnemy.minHits)) return '';

    for (let [movePSID, display] of result.userToEnemy.moveInfo) {
      if (display.includes('guaranteed')) return 'G';
    }
    return 'P';
  }, [result]);

  const userToEnemyMinHitText: string = useMemo(() => {
    if (result === null) return '';

    if (result.userToEnemy.minHits === 0) return '--';

    return result.userToEnemy.minHits < 10
      ? '' + result.userToEnemy.minHits
      : '!!'
  }, [result]);

  const enemyToUserGuaranteed: string = useMemo(() => {
    if (result === null) return '';

    if ([0,10].includes(result.enemyToUser.minHits)) return '';

    for (let [movePSID, display] of result.enemyToUser.moveInfo) {
      if (display.includes('guaranteed')) return 'G';
    }
    return 'P';
  }, [result]);

  const enemyToUserMinHitText: string = useMemo(() => {
    if (result === null) return '';

    if (result.enemyToUser.minHits === 0) return '--';

    return result.enemyToUser.minHits < 10
      ? '' + result.enemyToUser.minHits
      : '!!'
  }, [result]);
  
  const rateMatchup = useCallback(() => {
    
  }, [result]);
  
  return (
    <>
    {result !== null 
      ? <div
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
            U: {userToEnemyGuaranteed}{userToEnemyMinHitText}
          </div>
          <div className="versus-matchup__outspeed-wrapper">
            {result.outSpeed === true
              ? <div
                  title="You outspeed."
                  className="versus-matchup__outspeed"
                />
              : result.outSpeed === false
                ? <div
                    title="You're outsped."
                    className="versus-matchup__outsped"
                  />
                : <>
                    <div 
                      title="Speed tie."
                      className="versus-matchup__speed-tie-upper"
                    />
                    <div 
                      title="Speed tie."
                      className="versus-matchup__speed-tie-lower"
                    />
                  </>
            } 
          </div>
          <div
            className="versus-matchup__enemy-to-user"
            title={result?.enemyToUser.moveInfo.map(([movePSID, display]) => display).join('\n') || 'Cannot do damage.'}
          >
            E: {enemyToUserGuaranteed}{enemyToUserMinHitText}
          </div>
        </div>
      : <div className="versus-matchup__cell" />}
    </>
  );
};

export default VersusMatchupCell;