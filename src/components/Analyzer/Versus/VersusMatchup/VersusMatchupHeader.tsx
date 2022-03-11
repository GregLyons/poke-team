import { useCallback } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { DamageMatchupResult } from "../../../../utils/damageCalc";
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
    const columnResults: DamageMatchupResult[] = damageMatchup.map(row => row[idx]).filter(columnResult => columnResult !== null) as DamageMatchupResult[];

    const enemyPSID = enemyMember.psID;
    const enemyMovePSIDs: string[] = columnResults.reduce((movePSIDs, columnResult) => {
      return movePSIDs.concat(columnResult.enemyToUser.moveInfo.map(([movePSID, display]) => movePSID));
    }, [] as string[]);

    const userMemberPSIDObject: MemberPSIDObject = columnResults.reduce((acc, columnResult) => {
      return {
        ...acc,
        [columnResult.userPSID]: columnResult.userToEnemy.moveInfo.map(([movePSID, display]) => movePSID),
      };
    }, {});

    return {
      user: userMemberPSIDObject,
      enemy: {
        [enemyPSID]: enemyMovePSIDs,
      },
    };
  }, [damageMatchup, enemyMembers])
  return (
    <>
      {/* Filler */}
      <div />
      {enemyMembers.map((member, columnIdx) => 
      <div
        key={columnIdx}
        className={`
          versus-matchup__icon
          versus-matchup__icon--them
          ${colEmph === columnIdx
            ? '--emph'
            : ''
          }
        `}
        onMouseOver={onColumnMouseOver(columnIdx, relevantNames(columnIdx))}
        onFocus={onColumnMouseOver(columnIdx, relevantNames(columnIdx))}
        onMouseLeave={onColumnMouseLeave}
        onBlur={onColumnMouseLeave}
      >
        <PokemonIcon
          pokemonIconDatum={member?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
          gender={member?.gender}
        />
      </div>
      )}
    </>
  );
};

export default VersusMatchupHeader;