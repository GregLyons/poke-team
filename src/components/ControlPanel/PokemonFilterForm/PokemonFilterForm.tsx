import { useState } from "react";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { BASE_STAT_NAMES, PokemonFilter, PokemonFilterAction, TYPE_NAMES } from "../../../hooks/App/PokemonFilter";
import { BaseStatName, toAbbreviatedBaseStatName, toEnumTypeName, toFormattedTypeName, TypeName } from "../../../types-queries/helpers";
import DoubleSlider from "../../Reusables/DoubleSlider/DoubleSlider";
import DropdownMenu from "../../Reusables/DropdownMenu/DropdownMenu";

import './PokemonFilterForm.css';

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

  const handleTypeSelect = (type: TypeName) => {
    dispatchPokemonFilter({
      type: 'toggle_type',
      payload: type
    });
  };

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

  const onMinIncrement: (baseStat: BaseStatName) => ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) = baseStat => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      dispatchPokemonFilter({
        type: 'set_min_stat',
        payload: {
          statName: baseStat,
          value: pokemonFilter.minBaseStats[baseStat] + 1,
        }
      });
    }
  }

  const onMinDecrement: (baseStat: BaseStatName) => ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) = baseStat => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      dispatchPokemonFilter({
        type: 'set_min_stat',
        payload: {
          statName: baseStat,
          value: pokemonFilter.minBaseStats[baseStat] - 1,
        }
      });
    }
  }

  const onMaxIncrement: (baseStat: BaseStatName) => ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) = baseStat => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      dispatchPokemonFilter({
        type: 'set_max_stat',
        payload: {
          statName: baseStat,
          value: pokemonFilter.maxBaseStats[baseStat] + 1,
        }
      });
    }
  }

  const onMaxDecrement: (baseStat: BaseStatName) => ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) = baseStat => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      dispatchPokemonFilter({
        type: 'set_max_stat',
        payload: {
          statName: baseStat,
          value: pokemonFilter.maxBaseStats[baseStat] - 1,
        }
      });
    }
  }


  // #endregion

  return (
    <form className="pokemon-filter__wrapper">
      <div className="pokemon-filter__type-filter-wrapper">
        <label htmlFor="types">
          <DropdownMenu
            title={'FILTER BY TYPE'}
            items={TYPE_NAMES.map((typeName: TypeName) => {
              return {
                id: typeName,
                label: (
                  <button
                    className={`
                    pokemon-filter__button
                    ${pokemonFilter.types[typeName]
                      ? 'pokemon-filter__button--active'
                      : ''
                    }
                    `}
                  >
                    {toEnumTypeName(typeName)}
                  </button>
                ),
                selected: pokemonFilter.types[typeName]
              }
            })}
            toggleSelect={handleTypeSelect}
            dropdownWidth={'clamp(20vw, 40ch, 30%)'}
            itemWidth={'10ch'}
          />
        </label>
      </div>
      <div className="pokemon-filter__stat-filter-wrapper">
        <label htmlFor="Filter out Pokemon depending on base stats.">
          {BASE_STAT_NAMES.map(baseStatName => (
            <div className="pokemon-filter__stat-wrapper">
              {toAbbreviatedBaseStatName(baseStatName)}
              <DoubleSlider
                min={0}
                minValue={pokemonFilter.minBaseStats[baseStatName]}
                onMinChange={onMinChange(baseStatName)}
                onMinBlur={onMinBlur(baseStatName)}
                onMinIncrement={onMinIncrement(baseStatName)}
                onMinDecrement={onMinDecrement(baseStatName)}

                max={255}
                maxValue={pokemonFilter.maxBaseStats[baseStatName]}
                onMaxChange={onMaxChange(baseStatName)}
                onMaxBlur={onMaxBlur(baseStatName)}
                onMaxIncrement={onMaxIncrement(baseStatName)}
                onMaxDecrement={onMaxDecrement(baseStatName)}

                sliderWidth="clamp(100px, 7.5vw, 150px)"
              />
            </div>
          ))}
        </label>
      </div>
    </form>
  )
}

export default PokemonFilterForm;