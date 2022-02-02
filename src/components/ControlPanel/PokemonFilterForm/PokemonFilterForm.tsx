import { useState } from "react";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { BASE_STAT_NAMES, PokemonFilter, PokemonFilterAction, TYPE_NAMES } from "../../../hooks/App/PokemonFilter";
import { BaseStatName, toAbbreviatedBaseStatName, toFormattedTypeName, TypeName } from "../../../types-queries/helpers";
import DoubleSlider from "../../Reusables/DoubleSlider/DoubleSlider";

import './PokemonFilter.css';

type PokemonFilterFormProps = {
  dispatchPokemonFilter: React.Dispatch<PokemonFilterAction>
  pokemonFilter: PokemonFilter
  genFilter: GenFilter
}

const PokemonFilterForm = ({
  dispatchPokemonFilter,
  pokemonFilter,
  genFilter,
}: PokemonFilterFormProps) => {
  // Types
  // #region

  const [selectedAll, setSelectedAll] = useState(false);

  // #endregion

  // Base stats
  // #region

  // Don't update slider 

  const onMinChange: (baseStatName: BaseStatName) => ((e: React.ChangeEvent<HTMLInputElement>) => void) = baseStat => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) updateMin(baseStat, 0);
      else updateMin(baseStat, value);
    };
  }

  const onMinBlur: (baseStatName: BaseStatName) => ((e: React.FocusEvent<HTMLInputElement, Element>) => void) = baseStat => {
    return (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) updateMin(baseStat, 0);
      else updateMin(baseStat, value);
    };
  }

  const updateMin = (baseStat: BaseStatName, value: number) => {
    dispatchPokemonFilter({
      type: "set_min_stat",
      payload: {
        statName: baseStat,
        value,
      },
    });

    // Match special attack and special defense in Gen 1
    if (genFilter.gen === 1) {
      if (baseStat === 'specialAttack') {
        dispatchPokemonFilter({
          type: "set_min_stat",
          payload: {
            statName: 'specialDefense',
            value,
          }
        });
      }
      else if (baseStat === 'specialDefense') {
        dispatchPokemonFilter({
          type: "set_min_stat",
          payload: {
            statName: 'specialAttack',
            value,
          }
        });
      }
    }

  }

  const onMaxChange: (baseStatName: BaseStatName) => ((e: React.ChangeEvent<HTMLInputElement>) => void) = baseStat => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) updateMax(baseStat, 0);
      else updateMax(baseStat, value);
    }
  }

  const onMaxBlur: (baseStatName: BaseStatName) => ((e: React.FocusEvent<HTMLInputElement, Element>) => void) = baseStat => {
    return (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) updateMax(baseStat, 0);
      else updateMax(baseStat, value);
    };
  }

  const updateMax = (baseStat: BaseStatName, value: number) => {
    dispatchPokemonFilter({
      type: "set_max_stat",
      payload: {
        statName: baseStat,
        value,
      },
    });

    // Match special attack and special defense in Gen 1
    if (genFilter.gen === 1) {
      if (baseStat === 'specialAttack') {
        dispatchPokemonFilter({
          type: "set_max_stat",
          payload: {
            statName: 'specialDefense',
            value,
          }
        });
      }
      else if (baseStat === 'specialDefense') {
        dispatchPokemonFilter({
          type: "set_max_stat",
          payload: {
            statName: 'specialAttack',
            value,
          }
        });
      }
    }
  };

  // #endregion

  return (
    <div className="control-panel__pokemon-filter-wrapper">
      <form>
        <label htmlFor="Select Pokemon types to include in results.">
          Types:
          <button
            onClick={(e) => {
              e.preventDefault();

              dispatchPokemonFilter({
              type: selectedAll ? 'deselect_all_types' : 'select_all_types',
              });

              setSelectedAll(!selectedAll);
            }}
          >
            {selectedAll ? 'De-select all' : 'Select all'}
          </button>
          {TYPE_NAMES.map((typeName: TypeName) => (
            <>
              <input 
                type="checkbox"
                checked={pokemonFilter.types[typeName]}
                onClick={() => dispatchPokemonFilter({
                  type: 'toggle_type',
                  payload: typeName,
                })}
              />
              {toFormattedTypeName(typeName)}
            </>
          ))}
        </label>
        <label htmlFor="Filter out Pokemon depending on base stats.">
          <div className="base-stats__wrapper">
            {BASE_STAT_NAMES.map(baseStatName => (
              <div className="base-stats__stat-wrapper">
                {toAbbreviatedBaseStatName(baseStatName)}
                <DoubleSlider
                  min={0}
                  minValue={pokemonFilter.minBaseStats[baseStatName]}
                  onMinChange={onMinChange(baseStatName)}
                  onMinBlur={onMinBlur(baseStatName)}

                  max={255}
                  maxValue={pokemonFilter.maxBaseStats[baseStatName]}
                  onMaxChange={onMaxChange(baseStatName)}
                  onMaxBlur={onMaxBlur(baseStatName)}
                  sliderWidth="clamp(100px, 7.5vw, 150px)"
                />
              </div>
            ))}
          </div>
        </label>
      </form>
    </div>
  )
}

export default PokemonFilterForm;