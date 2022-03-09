import { useState } from "react";
import { Team } from "../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Dispatches, Filters } from "../../App";
import TeamColumn from "../TeamColumn/TeamColumn";
import './Versus.css';


type VersusProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
  enemyTeam: Team
};

const Versus = ({
  dispatches,
  filters,
  team,
  enemyTeam,
}: VersusProps) => {
  const [relevantNames, setRelevantNames] = useState<{ user: MemberPSIDObject, enemy: MemberPSIDObject, } | null>(null);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  // When ability, item, or move is clicked, emphasize the entity and member, and set 'isPopupActive' to 'true', as this action will open a pop-up window
  const onEntityClick = (whichTeam: 'user' | 'enemy') => {
    return (memberPSID: string, entityPSID: string) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if (whichTeam === 'user') {
          setRelevantNames({
            user: {
              ...relevantNames?.user,
            },
            enemy: {
              [memberPSID]: [entityPSID],
            },
          });
        }
        else {
          setRelevantNames({
            enemy: {
              ...relevantNames?.enemy,
            },
            user: {
              [memberPSID]: [entityPSID],
            },
          });
        }
        setIsPopupActive(true);
      };
    }
  } 

  // Once the pop-up window closes, set 'isPopupActive' to 'false', and set 'revantNames' to 'null'
  const onPopupClose = () => {
    setIsPopupActive(false);
    return setRelevantNames(null);
  }

  const [userMode, setUserMode] = useState<'normal' | 'stat'>('normal');
  const [enemyMode, setEnemyMode] = useState<'normal' | 'stat'>('normal');

  const toggleMode = (whichTeam: 'user' | 'enemy') => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      return whichTeam === 'user'
        ? userMode === 'normal'
          ? setUserMode('stat')
          : setUserMode('normal')
        : enemyMode === 'normal'
          ? setEnemyMode('stat')
          : setEnemyMode('normal');
    }
  };

  return (
    <div
      className={`
        versus__wrapper
      `}
    >
      <div className="versus__user-team-wrapper">
        <TeamColumn
          teamDispatch={dispatches.dispatchTeam}
          filters={filters}

          team={team}
          mode={userMode}
          relevantNames={relevantNames?.user || null}
          onEntityClick={onEntityClick('user')}
          onPopupClose={onPopupClose}
        />
      </div>
      <div
        className="versus__user-mode-toggle"
        onClick={toggleMode('user')}
      >
        {userMode}
      </div>
      <div
        className="versus__enemy-mode-toggle"
        onClick={toggleMode('enemy')}
      >
        {userMode}
      </div>
      <div className="versus__enemy-team-wrapper">
        <TeamColumn
          teamDispatch={dispatches.dispatchTeam}
          filters={filters}

          team={enemyTeam}
          mode={enemyMode}
          relevantNames={relevantNames?.enemy || null}
          onEntityClick={onEntityClick('enemy')}
          onPopupClose={onPopupClose}
        />
      </div>
    </div>
  );
};

export default Versus;