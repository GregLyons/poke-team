import { useEffect, useMemo, useState } from "react";
import { useIsFirstRender } from "usehooks-ts";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DamageMatchupResult, rateDamageMatchupResult, resultToStatPSIDs } from "../../../../utils/damageCalc";

type VersusMatchupCellProps = {
  result: DamageMatchupResult | null
  userFormattedName: string | undefined
  enemyFormattedName: string | undefined

  onCellMouseOver: (rowIdx: number, colIdx: number) => (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onCellMouseLeave: () => void

  rowIdx: number
  colIdx: number
  rowEmph: number | null
  colEmph: number | null
};

const VersusMatchupCell = ({
  result,
  userFormattedName,
  enemyFormattedName,

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
    const userMovePSIDs: string[] = result.userToEnemy.moveInfo.map(([movePSID, _]) => movePSID);
    const userStatPSIDs = resultToStatPSIDs(result, 'user');

    const enemyPSID = result.enemyPSID;
    const enemyMovePSIDs: string[] = result.enemyToUser.moveInfo.map(([movePSID, _]) => movePSID);
    const enemyStatPSIDs = resultToStatPSIDs(result, 'enemy');

    return {
      user: {
        [userPSID]: userMovePSIDs.concat(userStatPSIDs),
      },
      enemy: {
        [enemyPSID]: enemyMovePSIDs.concat(enemyStatPSIDs),
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

    for (let [_, display] of result.userToEnemy.moveInfo) {
      if (display.includes('guaranteed')) return 'G';
    }
    return 'P';
  }, [result]);

  const userToEnemyMinHitText: string = useMemo(() => {
    if (result === null) return '';

    if (result.userToEnemy.minHits === 0) return '---';

    return result.userToEnemy.minHits < 10
      ? '' + result.userToEnemy.minHits
      : '10+'
  }, [result]);

  const enemyToUserGuaranteed: string = useMemo(() => {
    if (result === null) return '';

    if ([0,10].includes(result.enemyToUser.minHits)) return '';

    for (let [_, display] of result.enemyToUser.moveInfo) {
      if (display.includes('guaranteed')) return 'G';
    }
    return 'P';
  }, [result]);

  const enemyToUserMinHitText: string = useMemo(() => {
    if (result === null) return '';

    if (result.enemyToUser.minHits === 0) return '---';

    return result.enemyToUser.minHits < 10
      ? '' + result.enemyToUser.minHits
      : '10+'
  }, [result]);
  
  const rateMatchup = useMemo(() => {
    return rateDamageMatchupResult(result);
  }, [result]);

  // Don't run following effect on first render
  const isFirst = useIsFirstRender();

  // 
  const [highlightChange, setHighlightChange] = useState<boolean>(false);

  // When significant change in cell occurs (number of hits changes, outcome goes from possible to guaranteed, etc.), highlight it briefly
  useEffect(() => {
    setHighlightChange(true);
    setTimeout(() => setHighlightChange(false), 2500);
  }, [userToEnemyGuaranteed, userToEnemyMinHitText, enemyToUserGuaranteed, enemyToUserMinHitText, ]);
  
  return (
    <td
      role="gridcell"
      aria-colindex={colIdx + 2}
    >
    {result !== null 
      ? <a
          title={userFormattedName && enemyFormattedName
            ? `Your ${userFormattedName} vs. enemy's ${enemyFormattedName}`
            : ``
          }
          className={`
            versus-matchup__cell
            ${emphasizeCell
              ? '--emph'
              : ''
            }
            ${!isFirst && highlightChange
              ? '--changed'
              : ''
            }
            ${rateMatchup !== 0
              ? '--' + rateMatchup
              : ''
            }
          `}
          onMouseOver={onCellMouseOver(rowIdx, colIdx)(relevantNames)}
          onFocus={onCellMouseOver(rowIdx, colIdx)(relevantNames)}
          onMouseLeave={onCellMouseLeave}
          onBlur={onCellMouseLeave}
        >
          <p
            className="versus-matchup__user-to-enemy"
            title={result?.userToEnemy.moveInfo.map(([_, display]) => display).join('\n') || 'Cannot do damage.'}
          >
            U {userToEnemyGuaranteed} {userToEnemyMinHitText}
          </p>
          <button className="versus-matchup__outspeed-wrapper">
            {result.moveFirst === true
              ? <div
                  title="You outspeed."
                  className="versus-matchup__outspeed"
                />
              : result.moveFirst === false
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
          </button>
          <p
            className="versus-matchup__enemy-to-user"
            title={result?.enemyToUser.moveInfo.map(([_, display]) => display).join('\n') || 'Cannot do damage.'}
          >
            E {enemyToUserGuaranteed} {enemyToUserMinHitText}
          </p>
        </a>
      : <a className="versus-matchup__cell" />}
    </td>
  );
};

export default VersusMatchupCell;