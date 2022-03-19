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
    <>
      <div
        className="versus-controls__user-mode-toggle"
        onClick={toggleMode('user')}
      >
        {userMode}
      </div>
      <div className="versus-controls__user-side">
        <SidePopup
          gen={gen}
          side={userSide}
          setSide={setUserSide}
          whichSide='your'
        />
      </div>
      <div className="versus-controls">
        <FieldPopup
          gen={gen}
          field={field}
          setField={setField}
        />
      </div>
      <div className="versus-controls__import">
        <Import
          teamDispatch={dispatches.dispatchEnemyTeam}
          filters={filters}
          team={enemyTeam}
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
        className="versus-controls__enemy-mode-toggle"
        onClick={toggleMode('enemy')}
      >
        {enemyMode}
      </div>
    </>
  );
};

export default VersusControls;