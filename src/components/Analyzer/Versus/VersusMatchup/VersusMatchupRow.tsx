import { useMemo } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { DamageMatchupResult, resultToStatPSIDs } from "../../../../utils/damageCalc";
import PokemonIcon from "../../../Icons/PokemonIcon";
import VersusMatchupCell from "./VersusMatchupCell";

type VersusMatchupRowProps = {
  userMember: MemberPokemon | null
  enemyMembers: (MemberPokemon | null)[]
  resultRow: (DamageMatchupResult | null)[]

  onCellMouseOver: (rowIdx: number, colIdx: number) => (newRelevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onCellMouseLeave: () => void

  onRowMouseOver: (relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onRowMouseLeave: () => void

  rowIdx: number
  rowEmph: number | null
  colEmph: number | null
};

const VersusMatchupRow = ({
  userMember,
  enemyMembers,
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
    
    // Row corresponds to single one of the user's members
    const userPSID = userMember.psID;
    const userPSIDs: string[] = rowResults.reduce((psIDs, rowResult) => {
      const userStatPSIDs = resultToStatPSIDs(rowResult, 'user');
      return psIDs.concat(userStatPSIDs).concat(rowResult.userToEnemy.moveInfo.map(([movePSID, _]) => movePSID));
    }, [] as string[]);

    // Row includes all six enemies, one result per enemy
    const enemyMemberPSIDObject: MemberPSIDObject = rowResults.reduce((acc, rowResult) => {
      const enemyStatPSIDs = resultToStatPSIDs(rowResult, 'enemy');
      return {
        ...acc,
        [rowResult.enemyPSID]: rowResult.enemyToUser.moveInfo.map(([movePSID, _]) => movePSID).concat(enemyStatPSIDs),
      }
    }, {});

    return {
      user: {
        [userPSID]: userPSIDs,
      },
      enemy: enemyMemberPSIDObject,
    };
  }, [userMember, resultRow]);

  return (
    <tr
      role="row"
      aria-rowindex={rowIdx + 2}
      className={`
        versus-matchup__row
      `}
    >
      <th
        scope="row"
        role="gridcell"
        aria-colindex={1}
        className={`
          versus-matchup__icon
          versus-matchup__icon
          --you
          ${rowEmph === rowIdx
            ? '--emph'
            : ''
          }
        `}
        title={userMember?.formattedName
          ? `Your ${userMember.formattedName} vs. enemy's team`
          : ''
        }

        onMouseOver={onRowMouseOver(relevantNames)}
        onFocus={onRowMouseOver(relevantNames)}
        onMouseLeave={onRowMouseLeave}
        onBlur={onRowMouseLeave}
      >
        <button>
          <PokemonIcon
            pokemonIconDatum={userMember?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
            gender={userMember?.gender}
          />
        </button>
      </th>
      {resultRow.map((result, colIdx) => <VersusMatchupCell
        key={colIdx}
        userFormattedName={userMember?.formattedName}
        enemyFormattedName={enemyMembers[colIdx]?.formattedName}

        result={result}
        onCellMouseOver={onCellMouseOver}
        onCellMouseLeave={onCellMouseLeave}

        rowIdx={rowIdx}
        colIdx={colIdx}
        rowEmph={rowEmph}
        colEmph={colEmph}
      />)}
    </tr>
  );
};

export default VersusMatchupRow;