import { PokemonIconDatum, toFormattedTypeName } from "../../../types-queries/helpers";
import { DoublesTier, SinglesTier } from "../../../utils/smogonLogic";
import PokemonIcon from "../../Icons/PokemonIcon";
import TypeIcon from "../../Icons/TypeIcon";
import Button from "../../Reusables/Button/Button";

type QuickSearchEntryProps = {
  pokemon: PokemonIconDatum
  baseStatTotal: number
  tier: SinglesTier | DoublesTier
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
  saved: boolean
}

const QuickSearchEntry = ({
  pokemon,
  baseStatTotal,
  tier,
  onSaveClick,
  saved,
}: QuickSearchEntryProps) => {
  return (
    <div
      className="quick-search__entry"
    >
      <div className="quick-search__save-wrapper">
        <div className="quick-search__save">
          <Button
            label="SAVE"
            title="Save Pokemon to box for teambuilding."

            onClick={e => onSaveClick(e, pokemon)}
            active={saved}
            disabled={false}
            immediate={false}
          />
        </div>
      </div>
      <div className="quick-search__icon">
        <PokemonIcon
          pokemonIconDatum={pokemon}
        />
      </div>
      <div className="quick-search__name">
        {pokemon.formattedName}
      </div>
      <div className="quick-search__typing">
        {pokemon.typing.map(typeName => (
          <TypeIcon 
            key={typeName}
            typeIconDatum={{
              name: typeName,
              formattedName: toFormattedTypeName(typeName),
            }}
          />
        ))}
      </div>
      <div className="quick-search__tier">
        {tier}
      </div>
      <div className="quick-search__stats">
        {Object.entries({ ...pokemon.baseStats, baseStatTotal }).map(([key, value]: [string, number]) => {
          if (key === '__typename') return;
          
          let rating: 'bad' | 'ok' | 'decent' | 'good' | 'great';
          if (key !== 'baseStatTotal')
            if (value <= 50) {
              rating = 'bad';
            } else if (value <= 80) {
              rating = 'ok';
            } else if (value <= 105) {
              rating = 'decent';
            } else if (value <= 140) {
              rating = 'good';
            } else {
              rating = 'great';
            }
          else {
            if (value <= 300) {
              rating = 'bad';
            } else if (value <= 400) {
              rating = 'ok';
            } else if (value <= 500) {
              rating = 'decent';
            } else if (value <= 600) {
              rating = 'good';
            } else {
              rating = 'great';
            }
          }

          return (
            <div
              key={`${pokemon.psID}_${key}`}
              className={`
                quick-search__stat
                ${rating}
              `}
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