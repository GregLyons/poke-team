import { useState } from "react";
import { BGManager, classWithBGShadow } from "../../../hooks/App/BGManager";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { BASE_STAT_NAMES, PokemonFilter, PokemonFilterAction, TYPE_NAMES } from "../../../hooks/App/PokemonFilter";
import { BaseStatName, toAbbreviatedBaseStatName, toEnumTypeName, toFormattedTypeName, TypeName } from "../../../types-queries/helpers";
import Button from "../../Reusables/Button/Button";
import DoubleSlider from "../../Reusables/DoubleSlider/DoubleSlider";
import DropdownMenu from "../../Reusables/DropdownMenu/DropdownMenu";

import './PokemonFilterForm.css';

type PokemonFilterFormProps = {
  dispatchPokemonFilter: React.Dispatch<PokemonFilterAction>
  pokemonFilter: PokemonFilter
  genFilter: GenFilter
  bgManager: BGManager
}

const PokemonFilterForm = ({
  dispatchPokemonFilter,
  pokemonFilter,
  genFilter,
  bgManager,
}: PokemonFilterFormProps) => {
  // Types
  // #region

  const [justClicked, setJustClicked] = useState(false);

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

  const handleStatSelect = (stat: BaseStatName) => {

  };

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
    <>
    <div className={classWithBGShadow("type-filter__cell", bgManager)}>
      <form className="type-filter__wrapper">
        <div className="type-filter__button">
          <label htmlFor="Select all types">
            <Button
              title={'Include all types.'}
              label='RESET'
              active={true}
              onClick={e => {
                e.preventDefault();
                dispatchPokemonFilter({
                  type: 'select_all_types',
                })
              }}
              disabled={false}
              immediate={true}
            />
          </label>
        </div>
        <div className="type-filter__select">
          <label htmlFor="Type select">
            <DropdownMenu
              title={'TYPE FILTER'}
              items={TYPE_NAMES.map((typeName: TypeName) => {
                return {
                  id: typeName,
                  label: (
                    <Button
                      title={pokemonFilter.types[typeName]
                        ? `Exclude ${toFormattedTypeName(typeName)}-type Pokemon.`
                        : `Include ${toFormattedTypeName(typeName)}-type Pokemon.`
                      }
                      label={toEnumTypeName(typeName)}
                      active={pokemonFilter.types[typeName]}
                      onClick={e => e.preventDefault()}
                      disabled={false}
                      immediate={false}
                    />
                  ),
                  selected: pokemonFilter.types[typeName]
                }
              })}
              toggleSelect={handleTypeSelect}
              dropdownWidth={'clamp(5vw, 50ch, 80%)'}
              itemWidth={'10ch'}
            />
          </label>
        </div>
      </form>
    </div>
    <div className={classWithBGShadow("stat-filter__cell", bgManager)}>
      <form className="stat-filter__wrapper">
        <div className="stat-filter__button">
          <label htmlFor="Reset stats">
            <Button
              title={'Reset stat filters to defaults.'}
              label='RESET'
              active={true}
              onClick={e => {
                e.preventDefault();
                dispatchPokemonFilter({
                  type: 'reset_stat_filter',
                });
              }}
              disabled={false}
              immediate={true}
            />
          </label>
        </div>
        <div className="stat-filter__select">
          <label htmlFor="Filter out Pokemon depending on base stats.">
            <DropdownMenu
              title="STAT FILTER"
              items={BASE_STAT_NAMES.map(baseStatName => {
                return {
                  id: baseStatName,
                  label: (
                    <div 
                      className="stat-filter__base-stat-wrapper"
                    > 
                      <div className="stat-filter__base-stat-name">
                        {toAbbreviatedBaseStatName(baseStatName).length === 3
                          ? toAbbreviatedBaseStatName(baseStatName)
                          : <>{toAbbreviatedBaseStatName(baseStatName)}&nbsp;</>}
                      </div>
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
      
                        sliderWidth="clamp(75px, 7.5vw, 150px)"
                      />
                    </div>
                  ),
                  selected: true,
                };
              })}
              toggleSelect={handleStatSelect}
              dropdownWidth={'clamp(5vw, 50ch, 80%)'}
              itemWidth={'100%'}
            />
          </label>
        </div>
      </form>
    </div>
    </>
  )
}

export default PokemonFilterForm;