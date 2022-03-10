import { useMemo } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { DamageMatchupResult } from "../../../../utils/damageCalc";
import PokemonIcon from "../../../Icons/PokemonIcon";
import VersusMatchupCell from "./VersusMatchupCell";

type VersusMatchupRowProps = {
  userMember: MemberPokemon | null
  resultRow: (DamageMatchupResult | null)[]

  onCellMouseOver: (rowIdx: number, colIdx: number) => (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) => void
  onCellMouseLeave: () => void

  onRowMouseOver: (relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) => void
  onRowMouseLeave: () => void

  rowIdx: number
  rowEmph: number | null
  colEmph: number | null
};

const VersusMatchupRow = ({
  userMember,
  resultRow,

  onCellMouseOver,
  onCellMouseLeave,

  onRowMouseOver,
  onRowMouseLeave,

  rowIdx,
  rowEmph,
  colEmph,
}: VersusMatchupRowProps) => {
  // When hovering over an icon, highlight the user member, the enemy members, and the relevant moves in the row
  const relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject } | null = useMemo(() => {
    // If no 'userMember', return
    if (!userMember) return null;

    // Get non-null results, if any
    const rowResults: DamageMatchupResult[] = resultRow.filter(rowResult => rowResult !== null) as DamageMatchupResult[]

    // If no results, return
    if (rowResults.length === 0) return null;
    
    const userPSID = userMember.psID;
    const userMovePSIDs: string[] = rowResults.reduce((movePSIDs, rowResult) => {
      return movePSIDs.concat(rowResult.userToEnemy.moveInfo.map(([movePSID, display]) => movePSID));
    }, [] as string[]);


    const enemyMemberPSIDObject: MemberPSIDObject = rowResults.reduce((acc, rowResult) => {
      return {
        ...acc,
        [rowResult.enemyPSID]: rowResult.enemyToUser.moveInfo.map(([movePSID, display]) => movePSID),
      }
    }, {});

    return {
      user: {
        [userPSID]: userMovePSIDs,
      },
      enemy: enemyMemberPSIDObject,
    };
  }, [userMember, resultRow]);

  return (
    <>
      <div
        className={`
          versus-matchup__icon
          ${rowEmph === rowIdx
            ? '--emph'
            : ''
          }
        `}
        onMouseOver={onRowMouseOver(relevantNames)}
        onFocus={onRowMouseOver(relevantNames)}
        onMouseLeave={onRowMouseLeave}
        onBlur={onRowMouseLeave}
      >
        <PokemonIcon
          pokemonIconDatum={userMember?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
          gender={userMember?.gender}
        />
      </div>
      {resultRow.map((result, colIdx) => <VersusMatchupCell
        key={colIdx}
        result={result}
        onCellMouseOver={onCellMouseOver}
        onCellMouseLeave={onCellMouseLeave}

        rowIdx={rowIdx}
        colIdx={colIdx}
        rowEmph={rowEmph}
        colEmph={colEmph}
      />)}
    </>
  );
};

export default VersusMatchupRow;