import { BaseStatName, PokemonIconDatum } from "../../../types-queries/helpers";
import TypeIcon from "../Icons/TypeIcon";

type QuickSearchEntryProps = {
  pokemon: PokemonIconDatum
}

const QuickSearchEntry = ({
  pokemon,
}: QuickSearchEntryProps) => {
  return (
    <div
      className="quick-search__entry"
    >
      <div className="quick-search__name">
        {pokemon.formattedName}
      </div>
      <div className="quick-search__typing">
        {pokemon.typing.map(typeName => (
          <TypeIcon 
            key={pokemon.psID + typeName}
            typeName={typeName}
          />
        ))}
      </div>
      <div className="quick-search__stats">
        {Object.entries(pokemon.baseStats).map(([key, value]: [string, number | string]) => {
          if (value === 'BaseStats') return;
          return (
            <div
              key={pokemon.psID + key}
              className="quick-search__stat"
            >
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default QuickSearchEntry;