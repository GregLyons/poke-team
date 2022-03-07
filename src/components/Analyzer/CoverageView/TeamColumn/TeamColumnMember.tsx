import { useCallback } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM, toFormattedTypeName } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import ItemIcon from "../../../Icons/ItemIcon";
import PokemonIcon from "../../../Icons/PokemonIcon";
import TypeIcon from "../../../Icons/TypeIcon";
import TeamColumnAbility from "./TeamColumnAbility";
import TeamColumnItem from "./TeamColumnItem";
import TeamColumnMove from "./TeamColumnMove";

type TeamColumnMemberProps = {
  dispatches: Dispatches
  filters: Filters

  member: MemberPokemon | null
  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnMember = ({
  dispatches,
  filters,

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
          analyzer-member__text
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
      <div className="analyzer-member__ability">
        <TeamColumnAbility
          dispatches={dispatches}
          filters={filters}
          member={member}
          ability={member?.ability}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onEntityClose={onEntityClose}
        />
      </div>
      <div className="analyzer-member__item">
        <TeamColumnItem
          dispatches={dispatches}
          filters={filters}
          member={member}
          item={member?.item}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onEntityClose={onEntityClose}
        />
      </div>
      {([0, 1, 2, 3] as (0 | 1 | 2 | 3)[]).map(idx => (<div
        className={`
          analyzer-member__move${idx + 1}
        `}
      >
        <TeamColumnMove
          dispatches={dispatches}
          filters={filters}
          key={`member_moveslot_${member?.psID}_${idx}`}
          member={member}
          move={member?.moveset[idx]}
          moveIdx={idx}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onEntityClose={onEntityClose}
        />
      </div>))}
    </div>
  )
};

export default TeamColumnMember;