import { BGManager, classWithBGShadow } from "../../../hooks/App/BGManager";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { BASE_STAT_NAMES, PokemonFilter, PokemonFilterAction, TYPE_NAMES } from "../../../hooks/App/PokemonFilter";
import { BaseStatName, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../types-queries/entities";
import { toCapsTypeName, toFormattedTypeName, TypeName } from "../../../types-queries/helpers";
import Button from "../../Reusables/Button/Button";
import DoubleSlider from "../../Reusables/DoubleSlider/DoubleSlider";
import DropdownMenu from "../../Reusables/DropdownMenu/DropdownMenu";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
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

  const updateMinValue = (baseStat: BaseStatName) => {
    return (value: number) => {
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
  }

  const updateMaxValue = (baseStat: BaseStatName) => {
    return (value: number) => {
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
    }
  };

  // #endregion

  return (
    <>
    <section aria-labelledby="type-filter" className={classWithBGShadow("type-filter__cell", bgManager)}>
      <h2 id="type-filter" className="hidden-header">Type filter</h2>
      <ErrorBoundary>
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
                  const selected = pokemonFilter.types[typeName];

                  return {
                    id: typeName,
                    label: (
                      <Button
                        title={selected
                          ? `Exclude ${toFormattedTypeName(typeName)}-type Pokemon.`
                          : `Include ${toFormattedTypeName(typeName)}-type Pokemon.`
                        }
                        label={toCapsTypeName(typeName)}
                        active={selected}
                        onClick={e => e.preventDefault()}
                        disabled={false}
                        immediate={false}
                      />
                    ),
                    selected,
                  }
                })}
                toggleSelect={handleTypeSelect}
                dropdownWidth={'clamp(5vw, 50ch, 80%)'}
                itemWidth={'10ch'}
                backgroundLight={bgManager.bgColor}
              />
            </label>
          </div>
        </form>
      </ErrorBoundary>
    </section>
    <section aria-labelledby="stat-filter" className={classWithBGShadow("stat-filter__cell", bgManager)}>
      <h2 id="stat-filter" className="hidden-header">Stat filter</h2>
      <ErrorBoundary>
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
                          titleFor={toFormattedBaseStatName(baseStatName)}
                          min={0}
                          minValue={pokemonFilter.minBaseStats[baseStatName]}
                          updateMinValue={updateMinValue(baseStatName)}
        
                          max={255}
                          maxValue={pokemonFilter.maxBaseStats[baseStatName]}
                          updateMaxValue={updateMaxValue(baseStatName)}
        
                          sliderWidth="clamp(75px, 7.5vw, 150px)"
                        />
                      </div>
                    ),
                    selected: true,
                  };
                })}
                dropdownWidth={'clamp(5vw, 50ch, 80%)'}
                dropLeft={true}
                itemWidth={'100%'}
                backgroundLight={bgManager.bgColor}
              />
            </label>
          </div>
        </form>
      </ErrorBoundary>
    </section>
    </>
  )
}

export default PokemonFilterForm;