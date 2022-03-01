import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import ItemIcon from "../../../Icons/ItemIcon";
import PokemonIcon from "../../../Icons/PokemonIcon";
import TypeIcon from "../../../Icons/TypeIcon";

type AnalyzerMemberProps = {
  member: MemberPokemon | null
};

const AnalyzerMember = ({
  member,
}: AnalyzerMemberProps) => {
  return (
    <div
      className="analyzer-member__wrapper"
    >
      <div className="analyzer-member__icon">
        {member && <PokemonIcon
          pokemonIconDatum={member?.iconDatum}
          gender={member?.gender}
        /> 
        || <PokemonIcon
          pokemonIconDatum={DUMMY_POKEMON_ICON_DATUM}
        />}
      </div>
      <div className="analyzer-member__item-icon">
        {member?.item && <ItemIcon
          itemIconDatum={{ name: member.item.psID, formattedName: member.item.formattedName}}
        />}
      </div>
      <div className="analyzer-member__name">
        {member?.formattedName || 'Empty'}
      </div>
      <div className="analyzer-member__typing">
        {member && member.typing.map(typeName => <TypeIcon
          key={`analyzer_${member.psID}_${typeName}`}
          typeName={typeName}
        />)}
      </div>
      <div className="analyzer-member__ability">
        {member?.ability?.formattedName || 'Empty'}
      </div>
      <div className="analyzer-member__item">
        {member?.item?.formattedName || 'Empty'}
      </div>
      <div className="analyzer-member__move1">{member?.moveset[0]?.formattedName || 'Empty'}</div>
      <div className="analyzer-member__move2">{member?.moveset[1]?.formattedName || 'Empty'}</div>
      <div className="analyzer-member__move3">{member?.moveset[2]?.formattedName || 'Empty'}</div>
      <div className="analyzer-member__move4">{member?.moveset[3]?.formattedName || 'Empty'}</div>
    </div>
  )
};

export default AnalyzerMember;