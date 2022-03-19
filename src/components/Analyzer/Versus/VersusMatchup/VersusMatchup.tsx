import { Field, Side } from "@smogon/calc";
import { useMemo, useRef, useState } from "react";
import { useRemoveFromTabOrder } from "../../../../hooks/useRemoveFromTabOrder";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { GenNum } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { calcDamageMatchup } from "../../../../utils/damageCalc";
import { handleGridKeyDown } from "../../../../utils/gridFocusManagement";
import { VersusPSIDObject } from "../Versus";
import './VersusMatchup.css';
import VersusMatchupHeader from "./VersusMatchupHeader";
import VersusMatchupRow from "./VersusMatchupRow";


type VersusMatchupProps = {
  userPokemon: (MemberPokemon | null)[]
  enemyPokemon: (MemberPokemon | null)[]
  gen: GenNum
  onMouseOver: (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: () => void

  field: Field
  userSide: Side
  enemySide: Side
};

const VersusMatchup = ({
  userPokemon,
  enemyPokemon,
  gen,
  onMouseOver,
  onMouseLeave,

  field,
  userSide,
  enemySide,
}: VersusMatchupProps) => {
  // Tracks focus/mouse position in the table, which is used to determine which cells/psIDs to highlight
  const [rowEmph, setRowEmph] = useState<number | null>(null);
  const [colEmph, setColEmph] = useState<number | null>(null);
  
  // Activates when hovering over row (user member) icon: relevantNames uses all the matchups in the row
  const onRowMouseOver = (rowIdx: number) => {
    return (relevantNames: VersusPSIDObject) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent>| React.FocusEvent<HTMLElement, Element>) => {
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
  const onColumnMouseOver = (colIdx: number, relevantNames: VersusPSIDObject) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>| React.FocusEvent<HTMLElement, Element>) => {
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
    return (relevantNames: VersusPSIDObject) => {
      return (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => {
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
  
  const damageMatchup = useMemo(() => {
    return calcDamageMatchup({
      userPokemon,
      enemyPokemon,
      gen,
      field,
      userSide,
      enemySide,
    });
  }, [userPokemon, enemyPokemon, gen, field, userSide, enemySide, ]);

  const grid = useRef<HTMLTableSectionElement>(null);

  useRemoveFromTabOrder(grid);

  return (
    <table
      className="versus-matchup__wrapper"
      // We only call onMouseLeave when leaving the entire table; otherwise, all of the Pokemon/move names on the sides will flash when moving between cells
      onBlur={onMouseLeave}
      onMouseLeave={onMouseLeave}
    >
      <tbody
        ref={grid}
        className="versus-matchup__table-body"
        role="grid"
        tabIndex={0}
        onKeyDown={e => handleGridKeyDown({
          grid,
          numRows: 7,
          numCols: 7,
          e,
          interactiveHeaders: true,
        })}
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
          enemyMembers={enemyPokemon}
          resultRow={resultRow}
          
          onCellMouseOver={onCellMouseOver}
          onCellMouseLeave={onCellMouseLeave}
          
          rowIdx={rowIdx}
          onRowMouseOver={onRowMouseOver(rowIdx)}
          onRowMouseLeave={onRowMouseLeave}
          rowEmph={rowEmph}
          colEmph={colEmph}
        />)}
      </tbody>
    </table>
  );
};

export default VersusMatchup;