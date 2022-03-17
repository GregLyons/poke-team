import { PokemonIconDatum, toFormattedTypeName } from "../../../types-queries/helpers";
import { getTier } from "../../../utils/smogonLogic";
import { Filters } from "../../App";
import PokemonIcon from "../../Icons/PokemonIcon";
import TypeIcon from "../../Icons/TypeIcon";
import Button from "../../Reusables/Button/Button";

type QuickSearchEntryProps = {
  filters: Filters
  pokemonIconDatum: PokemonIconDatum
  baseStatTotal: number
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
  saved: boolean
}

const QuickSearchEntry = ({
  filters,
  pokemonIconDatum,
  baseStatTotal,
  onSaveClick,
  saved,
}: QuickSearchEntryProps) => {
  return (
    <li
      className="quick-search__entry"
    >
      <div className="quick-search__save-wrapper">
        <div className="quick-search__save">
          <Button
            label="SAVE"
            title={`Save ${pokemonIconDatum.formattedName} for teambuilding.`}

            onClick={e => onSaveClick(e, pokemonIconDatum)}
            active={saved}
            disabled={false}
            immediate={false}
          />
        </div>
      </div>
      <div className="quick-search__icon">
        <PokemonIcon
          pokemonIconDatum={pokemonIconDatum}
        />
      </div>
      <div className="quick-search__name">
        {pokemonIconDatum.formattedName}
      </div>
      <div className="quick-search__typing">
        {pokemonIconDatum.typing.map(typeName => (
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
        {getTier(filters.genFilter.gen, filters.tierFilter.format, pokemonIconDatum.psID)}
      </div>
      <div className="quick-search__stats">
        {Object.entries({ ...pokemonIconDatum.baseStats, baseStatTotal }).map(([key, value]: [string, number]) => {
          if (key === '__typename') return <></>;
          
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
              key={`${pokemonIconDatum.psID}_${key}_${value}`}
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
    </li>
  )
};

export default QuickSearchEntry;