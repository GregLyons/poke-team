import { DamageMatchupResult } from "../../../../utils/damageCalc";

type VersusMatchupCellProps = {
  result: DamageMatchupResult | null
};

const VersusMatchupCell = ({
  result,
}: VersusMatchupCellProps) => {
  return (
    <div className="versus-matchup__cell">
      <div
        className="versus-matchup__user-to-enemy"
        title={result?.userToEnemy.moveInfo.map(([movePSID, display]) => display).join('\n') || 'Cannot do damage.'}
      >
        {result?.userToEnemy.minHits}
      </div>
      <div
        className="versus-matchup__enemy-to-user"
        title={result?.enemyToUser.moveInfo.map(([movePSID, display]) => display).join('\n') || 'Cannot do damage.'}
      >
        {result?.enemyToUser.minHits}
      </div>
    </div>
  );
};

export default VersusMatchupCell;