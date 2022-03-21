import { Field, Side } from "@smogon/calc";
import { useEffect, useState } from "react";
import { Team } from "../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Dispatches, Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import TeamColumn from "../TeamColumn/TeamColumn";
import './Versus.css';
import VersusControls from "./VersusControls/VersusControls";
import VersusMatchup from "./VersusMatchup/VersusMatchup";


type VersusProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
  enemyTeam: Team
};

export type VersusPSIDObject = {
  user: MemberPSIDObject
  enemy: MemberPSIDObject
} | null;

const Versus = ({
  dispatches,
  filters,
  team,
  enemyTeam,
}: VersusProps) => {
  const [relevantNames, setRelevantNames] = useState<VersusPSIDObject>(null);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  // Helper function so that we don't have to keep checking 'whichTeam' parameter in our other functions that update relevantNames
  const updateRelevantNames = (whichTeam: 'user' | 'enemy', memberPSIDObject: MemberPSIDObject) => {
    if (whichTeam === 'enemy') {
      return setRelevantNames({
        user: {
          ...relevantNames?.user,
        },
        enemy: memberPSIDObject,
      });
    }
    else {
      return setRelevantNames({
        enemy: {
          ...relevantNames?.enemy,
        },
        user: memberPSIDObject,
      });
    }
  };

  // When ability, item, or move is clicked, emphasize the entity and member, and set 'isPopupActive' to 'true', as this action will open a pop-up window
  const onEntityClick = (whichTeam: 'user' | 'enemy') => {
    return (memberPSID: string, entityPSID: string) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        updateRelevantNames(whichTeam, { [memberPSID]: [entityPSID], })
        return setIsPopupActive(true);
      };
    };
  };

  // Once the pop-up window closes, set 'isPopupActive' to 'false', and set 'revantNames' to 'null'
  const onPopupClose = () => {
    setIsPopupActive(false);
    return setRelevantNames(null);
  };

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
    };
  };

  const onMouseOver = (newRelevantNames: VersusPSIDObject) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => {
      e.preventDefault();
      if (!isPopupActive && newRelevantNames !== null) return setRelevantNames(newRelevantNames);
    };
  };

  const onMouseLeave = () => !isPopupActive && setRelevantNames(null);

  const [field, setField] = useState<Field>(new Field({
    gameType: filters.tierFilter.format === 'singles' ? 'Singles' : 'Doubles',
    isGravity: false,
  }));

  useEffect(() => {
    setField(new Field({
      ...field,
      gameType: filters.tierFilter.format === 'singles' ? 'Singles' : 'Doubles',
    }));
  }, [filters, setField]);

  const [userSide, setUserSide] = useState<Side>(new Side());
  const [enemySide, setEnemySide] = useState<Side>(new Side());

  return (
    <div
      className={`
        versus__wrapper
      `}
    >
      <section aria-labelledby="versus-user-team" className="versus__user-team-cell">
        <h2 id="versus-user-team" className="hidden-header">Your team</h2>
        <ErrorBoundary>
          <TeamColumn
            teamDispatch={dispatches.dispatchTeam}
            filters={filters}

            team={team}
            mode={userMode}
            teamFor='user'

            relevantNames={relevantNames?.user || null}
            onEntityClick={onEntityClick('user')}
            onPopupClose={onPopupClose}
          />
        </ErrorBoundary>
      </section>
      <div className="versus__matchup-cell">
        <section aria-labelledby="versus-controls" className="versus-controls__wrapper">
          <h2 id="versus-controls" className="hidden-header">Versus controls</h2>
          <ErrorBoundary>
            <VersusControls
              dispatches={dispatches}
              filters={filters}
              enemyTeam={enemyTeam}

              field={field}
              setField={setField}

              userSide={userSide}
              setUserSide={setUserSide}

              enemySide={enemySide}
              setEnemySide={setEnemySide}

              userMode={userMode}
              enemyMode={enemyMode}
              toggleMode={toggleMode}
            />
          </ErrorBoundary>
        </section>
        <section aria-labelledby="versus-matchup" className="versus-matchup__wrapper">
          <h2 id="versus-matchup" className="hidden-header">Matchup table</h2>
          <ErrorBoundary>
            <VersusMatchup
              userPokemon={team[filters.genFilter.gen].members}
              enemyPokemon={enemyTeam[filters.genFilter.gen].members}
              gen={filters.genFilter.gen}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}

              field={field}
              userSide={userSide}
              enemySide={enemySide}
            />
          </ErrorBoundary>
        </section>
      </div>
      <section aria-labelledby="versus-enemy-team" className="versus__enemy-team-cell">
        <h2 id="versus-enemy-team" className="hidden-header">Enemy's team</h2>
        <ErrorBoundary>
          <TeamColumn
            teamDispatch={dispatches.dispatchEnemyTeam}
            filters={filters}

            team={enemyTeam}
            mode={enemyMode}
            teamFor='enemy'

            relevantNames={relevantNames?.enemy || null}
            onEntityClick={onEntityClick('enemy')}
            onPopupClose={onPopupClose}
          />
        </ErrorBoundary>
      </section>
    </div>
  );
};

export default Versus;