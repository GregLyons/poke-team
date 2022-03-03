import { useCallback } from "react";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../types-queries/helpers";
import ItemIcon from "../../Icons/ItemIcon";
import PokemonIcon from "../../Icons/PokemonIcon";
import TypeIcon from "../../Icons/TypeIcon";

type AnalyzerMemberProps = {
  member: MemberPokemon | null
  relevantNames: MemberPSIDObject | null
};

const AnalyzerMember = ({
  member,
  relevantNames,
}: AnalyzerMemberProps) => {
  const determineRelevancy = useCallback((name: string | undefined) => {
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
          ${determineRelevancy(member?.psID)}
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
          ${determineRelevancy(member?.item?.psID)}
        `}
      >
        {member?.item && <ItemIcon
          itemIconDatum={{ name: member.item.psID, formattedName: member.item.formattedName}}
        />}
      </div>
      <div
        className={`
          analyzer-member__name
          ${determineRelevancy(member?.psID)}
        `}
      >
        {member?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__typing
          ${determineRelevancy(member?.psID)}
        `}
      >
        {member && member.typing.map(typeName => <TypeIcon
          key={`analyzer_${member.psID}_${typeName}`}
          typeName={typeName}
        />)}
      </div>
      <div
        className={`
          analyzer-member__ability
          ${determineRelevancy(member?.ability?.psID)}
        `}
      >
        {member?.ability?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__item
          ${determineRelevancy(member?.item?.psID)}
        `}
      >
        {member?.item?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__move1
          ${determineRelevancy(member?.moveset[0]?.psID)}
        `}
      >
        {member?.moveset[0]?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__move2
          ${determineRelevancy(member?.moveset[1]?.psID)}
        `}
      >
        {member?.moveset[1]?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__move3
          ${determineRelevancy(member?.moveset[2]?.psID)}
        `}
      >
        {member?.moveset[2]?.formattedName || ''}
      </div>
      <div
        className={`
          analyzer-member__move4
          ${determineRelevancy(member?.moveset[3]?.psID)}
        `}
      >
        {member?.moveset[3]?.formattedName || ''}
      </div>
    </div>
  )
};

export default AnalyzerMember;