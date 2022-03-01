import { useCallback } from "react";
import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import ItemIcon from "../../../Icons/ItemIcon";
import PokemonIcon from "../../../Icons/PokemonIcon";
import TypeIcon from "../../../Icons/TypeIcon";

type AnalyzerMemberProps = {
  member: MemberPokemon | null
  relevantNames: string[] | null
};

const AnalyzerMember = ({
  member,
  relevantNames,
}: AnalyzerMemberProps) => {
  const determineRelevancy = useCallback((name: string | undefined) => {
    if (relevantNames === null) return '';
    else if (relevantNames.includes(name || '')) return 'analyzer-member__relevant';
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
        {member?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__typing
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
        {member?.ability?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__item
          ${determineRelevancy(member?.item?.psID)}
        `}
      >
        {member?.item?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__move1
          ${determineRelevancy(member?.moveset[0]?.psID)}
        `}
      >
        {member?.moveset[0]?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__move2
          ${determineRelevancy(member?.moveset[1]?.psID)}
        `}
      >
        {member?.moveset[1]?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__move3
          ${determineRelevancy(member?.moveset[2]?.psID)}
        `}
      >
        {member?.moveset[2]?.formattedName || 'Empty'}
      </div>
      <div
        className={`
          analyzer-member__move4
          ${determineRelevancy(member?.moveset[3]?.psID)}
        `}
      >
        {member?.moveset[3]?.formattedName || 'Empty'}
      </div>
    </div>
  )
};

export default AnalyzerMember;