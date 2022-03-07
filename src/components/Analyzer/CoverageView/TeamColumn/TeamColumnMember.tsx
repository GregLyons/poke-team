import { useCallback } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM, toFormattedTypeName } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import ItemIcon from "../../../Icons/ItemIcon";
import PokemonIcon from "../../../Icons/PokemonIcon";
import TypeIcon from "../../../Icons/TypeIcon";
import TeamColumnAbility from "./TeamColumnAbility";
import TeamColumnItem from "./TeamColumnItem";
import TeamColumnMove from "./TeamColumnMove";

type TeamColumnMemberProps = {
  member: MemberPokemon | null
  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnMember = ({
  member,
  relevantNames,
  onEntityClick,
  onEntityClose,
}: TeamColumnMemberProps) => {
  const determineRelevance = useCallback((name: string | undefined) => {
    if (member === null || relevantNames === null) return '';
    else if (name && relevantNames[member?.psID] && relevantNames[member?.psID].includes(name)) return 'analyzer-member__relevant';
    else if (name && Object.keys(relevantNames).includes(name)) return 'analyzer-member__relevant';
    else return 'analyzer-member__irrelevant';
  }, [relevantNames]);

  return (
    <div
      className={`
        analyzer-member__wrapper
      `}
    >
      <div
        className={`
          analyzer-member__icon
          ${determineRelevance(member?.psID)}
        `}
      >
        {member && <PokemonIcon
          pokemonIconDatum={member?.iconDatum}
          gender={member?.gender}
        /> 
        || <PokemonIcon
          pokemonIconDatum={DUMMY_POKEMON_ICON_DATUM}
        />}
      </div>
      <div
        className={`
          analyzer-member__item-icon
          ${determineRelevance(member?.item?.psID)}
        `}
      >
        {member?.item && <ItemIcon
          itemIconDatum={{ name: member.item.psID, formattedName: member.item.formattedName}}
        />}
      </div>
      <div
        className={`
          analyzer-member__name
          ${determineRelevance(member?.psID)}
        `}
      >
        {member?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__typing
          ${determineRelevance(member?.psID)}
        `}
      >
        {member && member.typing.map(typeName => <TypeIcon
          key={`analyzer_${member.psID}_${typeName}`}
          typeIconDatum={{
            name: typeName,
            formattedName: toFormattedTypeName(typeName)
          }}
        />)}
      </div>
      <TeamColumnAbility
        member={member}
        ability={member?.ability}
        determineRelevance={determineRelevance}
        onEntityClick={onEntityClick}
        onEntityClose={onEntityClose}
      />
      <TeamColumnItem
        member={member}
        item={member?.item}
        determineRelevance={determineRelevance}
        onEntityClick={onEntityClick}
        onEntityClose={onEntityClose}
      />
      {([0, 1, 2, 3] as (0 | 1 | 2 | 3)[]).map(idx => (<TeamColumnMove
        key={`member_moveslot_${idx}`}
        member={member}
        move={member?.moveset[idx]}
        moveIdx={idx}
        determineRelevance={determineRelevance}
        onEntityClick={onEntityClick}
        onEntityClose={onEntityClose}
      />))}
    </div>
  )
};

export default TeamColumnMember;