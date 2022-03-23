import { BGManager, classWithBGShadow } from "../../../hooks/App/BGManager";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { BASE_STAT_NAMES, PokemonFilter, PokemonFilterAction } from "../../../hooks/App/PokemonFilter";
import { BaseStatName, toAbbreviatedBaseStatName, toFormattedBaseStatName } from "../../../types-queries/entities";
import { toCapsTypeName, toFormattedTypeName, TypeName, TYPENAMES } from "../../../types-queries/helpers";
import Button from "../../Reusables/Button/Button";
import Checkbox from "../../Reusables/Checkbox/Checkbox";
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

  const handleTypeSelect = (typeName: TypeName) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPokemonFilter({
      type: 'toggle_type',
      payload: typeName
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
      <ErrorBoundary orientation="bottom" nudge="left">
        <form className="type-filter__wrapper">
          <div className="type-filter__button">
            <label className="hidden-label" htmlFor="tpe_filter_reset">Reset type filter</label>
            <Button
              id="type_filter_reset"
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
          </div>
          <div className="type-filter__select">
            <label htmlFor="type_filter_trigger" className="hidden-label">Type filter dropdown</label>
            <DropdownMenu
              triggerID="type_filter_trigger"
              label={'TYPE FILTER'}
              content={<fieldset className="type-filter__type-list">
                <legend className="hidden-label">Type filter</legend>
                {TYPENAMES.map(([typeName, typeGen]) => {
                  // Only show types present in this gen
                  if (genFilter.gen < typeGen) return; 

                  const checked = pokemonFilter.types[typeName];

                  return <Checkbox
                    key={typeName}

                    id={typeName + '_typeFilter'}
                    label={toCapsTypeName(typeName)}
                    title={checked
                      ? `Exclude ${toFormattedTypeName(typeName)}-type Pokemon.`
                      : `Include ${toFormattedTypeName(typeName)}-type Pokemon.`
                    }

                    checked={checked}
                    onChange={handleTypeSelect(typeName)}
                  />
                })}
              </fieldset>}

              dropLeft={true}

              dropdownWidth={'clamp(5vw, 50ch, 80%)'}
              backgroundLight={bgManager.bgColor}
            />
          </div>
        </form>
      </ErrorBoundary>
    </section>
    <section aria-labelledby="stat-filter" className={classWithBGShadow("stat-filter__cell", bgManager)}>
      <h2 id="stat-filter" className="hidden-header">Stat filter</h2>
      <ErrorBoundary orientation="bottom" nudge="left">
        <form className="stat-filter__wrapper">
          <div className="stat-filter__button">
            <label htmlFor="stat_filter_reset" className="hidden-label">Reset stat filter</label>
            <Button
              id="stat_filter_reset"
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
          </div>
          <div className="stat-filter__select">
            <label htmlFor="stat_filter_trigger" className="hidden-label">Base stat filter dropdown</label>
            <DropdownMenu
              triggerID="stat_filter_trigger"
              label="STAT FILTER"
              content={<fieldset>
                <legend className="hidden-label">Stat filter</legend>
                {BASE_STAT_NAMES.map(baseStatName => {
                  return (
                    <div
                      key={baseStatName}

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
                  ) 
                })}
              </fieldset>}
              
              dropdownWidth={'clamp(5vw, 50ch, 80%)'}
              dropLeft={true}
              backgroundLight={bgManager.bgColor}
            />
          </div>
        </form>
      </ErrorBoundary>
    </section>
    </>
  )
}

export default PokemonFilterForm;