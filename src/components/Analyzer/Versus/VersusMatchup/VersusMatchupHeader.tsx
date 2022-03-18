import { useCallback } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { DamageMatchupResult, resultToStatPSIDs } from "../../../../utils/damageCalc";
import PokemonIcon from "../../../Icons/PokemonIcon";

type VersusMatchupHeaderProps = {
  damageMatchup: (DamageMatchupResult | null)[][]
  enemyMembers: (MemberPokemon | null)[]
  onColumnMouseOver: (idx: number, relevantNames: { user: MemberPSIDObject, enemy: MemberPSIDObject} | null) => (e: React.MouseEvent<HTMLElement, MouseEvent>| React.FocusEvent<HTMLDivElement, Element>) => void
  onColumnMouseLeave: () => void
  colEmph: number | null
};

const VersusMatchupHeader = ({
  damageMatchup,
  enemyMembers,
  onColumnMouseOver,
  onColumnMouseLeave,
  colEmph,
}: VersusMatchupHeaderProps) => {
  // When hovering over an icon, hightlight the enemy member, the user members, and the relevant moves in the column
  const relevantNames: (columnIdx: number) => { user: MemberPSIDObject, enemy: MemberPSIDObject } | null = useCallback((idx) => {
    // Select enemyMember based on 'idx'
    const enemyMember = enemyMembers[idx];

    // If no 'enemyMember' return
    if (!enemyMember) return null;

    // Get non-null results, if any
    const columnResults: DamageMatchupResult[] = damageMatchup.map(row => row[idx]).filter(colResult => colResult !== null) as DamageMatchupResult[];

    // Column corresponds to single enemy
    const enemyPSID = enemyMember.psID;
    const enemyPSIDs: string[] = columnResults.reduce((psIDs, colResult) => {
      const enemyStatPSIDs = resultToStatPSIDs(colResult, 'enemy');
      return psIDs.concat(enemyStatPSIDs).concat(colResult.enemyToUser.moveInfo.map(([movePSID, _]) => movePSID));
    }, [] as string[]);

    // Column includes all six of the user's members, one result per member
    const userMemberPSIDObject: MemberPSIDObject = columnResults.reduce((acc, colResult) => {
      const userStatPSIDs = resultToStatPSIDs(colResult, 'user');
      return {
        ...acc,
        [colResult.userPSID]: colResult.userToEnemy.moveInfo.map(([movePSID, _]) => movePSID).concat(userStatPSIDs),
      };
    }, {});

    return {
      user: userMemberPSIDObject,
      enemy: {
        [enemyPSID]: enemyPSIDs,
      },
    };
  }, [damageMatchup, enemyMembers]);

  return (
    <tr
      role="row"
      aria-rowindex={1}
      className={`
        versus-matchup__row
      `}
    >
      <th
        scope="col"
        role="gridcell"
        aria-colindex={1}
      >
        <a>
          Vs.
        </a>  
      </th>
      {enemyMembers.map((member, columnIdx) => 
      <th
        key={columnIdx}
        
        scope="col"
        role="gridcell"
        aria-colindex={columnIdx + 2}
        
        className={`
          versus-matchup__icon
          versus-matchup__icon
          --them
          ${colEmph === columnIdx
            ? '--emph'
            : ''
          }
        `}
        title={member?.formattedName
          ? `Enemy's ${member.formattedName} vs. your team`
          : ``
        }
        onMouseOver={onColumnMouseOver(columnIdx, relevantNames(columnIdx))}
        onFocus={onColumnMouseOver(columnIdx, relevantNames(columnIdx))}
        onMouseLeave={onColumnMouseLeave}
        onBlur={onColumnMouseLeave}
      >
        <a>
          <PokemonIcon
            pokemonIconDatum={member?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
            gender={member?.gender}
          />
        </a>
      </th>
      )}
    </tr>
  );
};

export default VersusMatchupHeader;