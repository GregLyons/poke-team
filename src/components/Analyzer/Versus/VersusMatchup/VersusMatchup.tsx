import { useMemo, useState } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { GenNum } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { calcDamageMatchup } from "../../../../utils/damageCalc";
import './VersusMatchup.css';
import VersusMatchupHeader from "./VersusMatchupHeader";
import VersusMatchupRow from "./VersusMatchupRow";


type VersusMatchupProps = {
  userPokemon: (MemberPokemon | null)[]
  enemyPokemon: (MemberPokemon | null)[]
  gen: GenNum
  onMouseOver: (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) => void
  onMouseLeave: () => void
};

const VersusMatchup = ({
  userPokemon,
  enemyPokemon,
  gen,
  onMouseOver,
  onMouseLeave,
}: VersusMatchupProps) => {
  // Tracks focus/mouse position in the table, which is used to determine which cells/psIDs to highlight
  const [rowEmph, setRowEmph] = useState<number | null>(null);
  const [colEmph, setColEmph] = useState<number | null>(null);
  
  // Activates when hovering over row (user member) icon: relevantNames uses all the matchups in the row
  const onRowMouseOver = (rowIdx: number) => {
    return (relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject, } | null) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent>| React.FocusEvent<HTMLDivElement, Element>) => {
        e.preventDefault();

        setRowEmph(rowIdx);

        // No longer hovering over a column
        setColEmph(null);

        return onMouseOver(relevantNames)(e);
      };
    };
  };

  const onRowMouseLeave = () => {
    setRowEmph(null);
    return;
  };

  // Activates when hovering over column (enemy member) icon: relevantNames uses all the matchups in the row
  const onColumnMouseOver = (colIdx: number, relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject, } | null) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>| React.FocusEvent<HTMLDivElement, Element>) => {
      e.preventDefault();

      setColEmph(colIdx);

      // No longer hovering over a row
      setRowEmph(null);
      
      return onMouseOver(relevantNames)(e);
    };
  };

  const onColumnMouseLeave = () => {
    setColEmph(null);
    return;
  };

  // Activates when hovering over cell in table
  const onCellMouseOver = (rowIdx: number, colIdx: number) => {
    return (relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject, } | null) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) => {
        e.preventDefault();

        // Hovering over a row and a column
        setRowEmph(rowIdx);
        setColEmph(colIdx);

        return onMouseOver(relevantNames)(e);
      }
    }
  };

  const onCellMouseLeave = () => {
    setRowEmph(null);
    setColEmph(null);
    return;
  }
  
  const damageMatchup = useMemo(() => calcDamageMatchup({
    userPokemon,
    enemyPokemon,
    gen,
  }), [userPokemon, enemyPokemon, gen]);

  return (
    <div
      className="versus-matchup__wrapper"
      // We only call onMouseLeave when leaving the entire table; otherwise, all of the Pokemon/move names on the sides will flash when moving between cells
      onMouseLeave={onMouseLeave}
    >
      <VersusMatchupHeader
        damageMatchup={damageMatchup}
        enemyMembers={enemyPokemon}

        onColumnMouseOver={onColumnMouseOver}
        onColumnMouseLeave={onColumnMouseLeave}
        colEmph={colEmph}
      />
      {damageMatchup.map((resultRow, rowIdx) => <VersusMatchupRow
        key={rowIdx}
        userMember={userPokemon[rowIdx]}
        resultRow={resultRow}
        
        onCellMouseOver={onCellMouseOver}
        onCellMouseLeave={onCellMouseLeave}
        
        rowIdx={rowIdx}
        onRowMouseOver={onRowMouseOver(rowIdx)}
        onRowMouseLeave={onRowMouseLeave}
        rowEmph={rowEmph}
        colEmph={colEmph}
      />)}
    </div>
  );
};

export default VersusMatchup;