import { useState } from "react";
import { BASE_STAT_NAMES, GenFilter, PokemonFilter, PokemonFilterAction, TYPE_NAMES } from "../../../hooks/app-hooks";
import { BaseStatName, toFormattedBaseStatName, toFormattedTypeName, TypeName } from "../../../types-queries/helpers";
import DoubleSlider from "../../Forms/DoubleSlider";

import '../ControlPanel.css';

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
  const [selectedAll, setSelectedAll] = useState(false);
  const [noMinEntered, setNoMinEntered] = useState<{[baseStatName in BaseStatName]: boolean}>({
    hp: false,
    attack: false,
    defense: false,
    specialAttack: false,
    specialDefense: false,
    speed: false,
  });
  const [noMaxEntered, setNoMaxEntered] = useState<{[baseStatName in BaseStatName]: boolean}>({
    hp: false,
    attack: false,
    defense: false,
    specialAttack: false,
    specialDefense: false,
    speed: false,
  });

  const onMinChange: (baseStatName: BaseStatName) => ((e: React.ChangeEvent<HTMLInputElement>) => void) = baseStat => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.value === '') {
        setNoMinEntered({
          ...noMinEntered,
          [baseStat]: true,
        })
        return;
      }
      else {
        setNoMinEntered({
          ...noMinEntered,
          [baseStat]: false,
        });
      }

      dispatchPokemonFilter({
        type: "set_min_stat",
        payload: {
          statName: baseStat,
          value: parseInt(e.target.value, 10),
        },
      });
    };
  }

  const onMaxChange: (baseStatName: BaseStatName) => ((e: React.ChangeEvent<HTMLInputElement>) => void) = baseStat => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.value === '') {
        setNoMaxEntered({
          ...noMaxEntered,
          [baseStat]: true,
        })
        return;
      }
      else {
        setNoMaxEntered({
          ...noMaxEntered,
          [baseStat]: false,
        });
      }

      dispatchPokemonFilter({
        type: "set_max_stat",
        payload: {
          statName: baseStat,
          value: parseInt(e.target.value, 10),
        },
      });
    };
  }

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
                {toFormattedBaseStatName(baseStatName)}
                <DoubleSlider
                  min={0}
                  minValue={pokemonFilter.minBaseStats[baseStatName]}
                  onMinChange={onMinChange(baseStatName)}
                  noMinEntered={noMinEntered[baseStatName]}
                  max={255}
                  maxValue={pokemonFilter.maxBaseStats[baseStatName]}
                  noMaxEntered={noMaxEntered[baseStatName]}
                  onMaxChange={onMaxChange(baseStatName)}
                  sliderWidth="150px"
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