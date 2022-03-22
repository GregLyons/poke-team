import { Field, Side } from "@smogon/calc";
import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import Import from "../../../ControlPanel/ImportExport/Import/Import";
import FieldPopup from "./FieldPopup";
import SidePopup from "./SidePopup";
import './VersusControls.css';


type VersusControlsProps = {
  dispatches: Dispatches
  filters: Filters
  enemyTeam: Team

  field: Field
  setField: React.Dispatch<React.SetStateAction<Field>>

  userSide: Side
  setUserSide: React.Dispatch<React.SetStateAction<Side>>

  enemySide: Side
  setEnemySide: React.Dispatch<React.SetStateAction<Side>>

  userMode: 'normal' | 'stat'
  enemyMode: 'normal' | 'stat'
  toggleMode: (whichTeam: 'user' | 'enemy') => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const VersusControls = ({
  dispatches,
  filters,
  enemyTeam,
  
  field,
  setField,

  userSide,
  setUserSide,

  enemySide,
  setEnemySide,
  
  userMode,
  enemyMode,
  toggleMode,
}: VersusControlsProps) => {
  const gen = filters.genFilter.gen;

  return (
    <fieldset>
      <legend className="hidden-label">Versus controls</legend>
      <label htmlFor="versus_mode_toggle_user" className="hidden-label">Toggle mode for your team</label>
      <button
        id="versus_mode_toggle_user"
        className="versus-controls__mode-toggle"
        onClick={toggleMode('user')}
      >
        {userMode === 'normal' ? 'STAT' : 'MOVE'}
      </button>
      <fieldset className="versus-controls__user-side">
        <legend></legend>
        <SidePopup
          gen={gen}
          side={userSide}
          setSide={setUserSide}
          whichSide='your'
        />
      </fieldset>
      <div className="versus-controls">
        <FieldPopup
          gen={gen}
          field={field}
          setField={setField}
        />
      </div>
      <div className="versus-controls__enemy-side">
        <SidePopup
          gen={gen}
          side={enemySide}
          setSide={setEnemySide}
          whichSide='enemy'
        />
      </div>
      <div
        className="versus-controls__import"
      >
        {enemyTeam[filters.genFilter.gen].members.filter(d => d !== null).length !== 0
          ? <button
              className="versus-controls__clear"
              title="Clear current enemy team."
              onClick={e => {
                e.preventDefault();
                dispatches.dispatchEnemyTeam({
                  type: 'clear_team',
                  payload: {
                    gen: filters.genFilter.gen,
                  },
                });
              }}
              style={{
                border: '1px solid transparent',
              }}
            >
              CLEAR
            </button>
          : <Import
              teamDispatch={dispatches.dispatchEnemyTeam}
              filters={filters}
              team={enemyTeam}
            />
        }
      </div>
      <button
        className="versus-controls__mode-toggle"
        onClick={toggleMode('enemy')}
      >
        {enemyMode === 'normal' ? 'STAT' : 'MOVE'}
      </button>
    </fieldset>
  );
};

export default VersusControls;