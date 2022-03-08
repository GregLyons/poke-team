import { useCallback } from "react";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { DUMMY_POKEMON_ICON_DATUM, toFormattedTypeName } from "../../../../types-queries/helpers";
import { MoveSlot } from "../../../../types-queries/Member/helpers";
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
  memberIdx: number

  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnMember = ({
  dispatches,
  filters,

  member,
  memberIdx,

  relevantNames,
  onEntityClick,
  onPopupClose,
}: TeamColumnMemberProps) => {
  // Highlights/de-highlights ability names, move names, etc. which are relevant to the element being hovered over (e.g. a cell in the type coverage chart)
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
          key={typeName}
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
          memberIdx={memberIdx}

          ability={member?.ability}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      </div>
      <div className="analyzer-member__item">
        <TeamColumnItem
          dispatches={dispatches}
          filters={filters}

          member={member}
          memberIdx={memberIdx}

          item={member?.item}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      </div>
      {([0, 1, 2, 3] as (MoveSlot)[]).map(idx => (<div
        className={`
          analyzer-member__move${idx + 1}
        `}
      >
        <TeamColumnMove
          key={idx}

          dispatches={dispatches}
          filters={filters}

          member={member}
          memberIdx={memberIdx}

          move={member?.moveset[idx]}
          moveIdx={idx}
          determineRelevance={determineRelevance}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      </div>))}
    </div>
  )
};

export default TeamColumnMember;