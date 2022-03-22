import { useMemo, useState } from 'react';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { Team } from '../../../hooks/App/Team';
import { useDelayedQuery, useRemovalConnectedSearchBar } from '../../../hooks/Searches';
import { PokemonQuickSearchQuery, PokemonQuickSearchVars, POKEMON_QUICKSEARCH_QUERY } from '../../../types-queries/Builder/QuickSearch';
import { CapsTypeName, PokemonColumnName, PokemonIconDatum, PokemonPaginationInput, toCapsTypeName, TypeName } from '../../../types-queries/helpers';
import { Dispatches, Filters } from '../../App';
import ErrorBoundary from '../../Reusables/ErrorBoundary/ErrorBoundary';
import LoadIcon from '../../Reusables/LoadIcon/LoadIcon';
import SortSwitch from '../../Reusables/SortSwitch/SortSwitch';
import './QuickSearch.css';
import QuickSearchEntries from './QuickSearchEntries';

type QuickSearchProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const QuickSearch = ({
  dispatches,
  filters,
  team,
}: QuickSearchProps) => {
  const [pagination, setPagination] = useState<PokemonPaginationInput>({
    orderBy: 'POKEMON_SHOWDOWN_ID',
    sortBy: 'ASC',
  });


  /*
    We need to combine three sets of query variables: the generation variables, the variables for the 'searchBar' ('startsWith'/'contains'), and the variables from PokemonFilter. We use our custom hook to combine the first two into 'removalVars', and then we capture all three in the variable 'queryVars'.

    We need to combine these variables in order to pass them as a single object to useDelayedQuery. useRemovalConnectedSearchBar does not update the other variables (e.g. from PokemonFilter), so we need a useMemo to get the others to update.
  */
  // #region

  const { queryVars: removalVars, searchBar, focusedOnInput, } = useRemovalConnectedSearchBar<PokemonQuickSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,

      limit: 20,
      orderBy: pagination.orderBy,
      sortBy: pagination.sortBy,

      startsWith: '',
      contains: '',
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),

      types: Object.entries(filters.pokemonFilter.types).reduce((acc, [key, value]) => {
        const typeName = key as TypeName;
        // Type-guard
        if (!typeName || key === '__typename') return acc;

        // If type is not selected in filter
        if (!value) return acc;
        
        return acc.concat(toCapsTypeName(typeName));
      }, [] as CapsTypeName[]),

      maxHP: filters.pokemonFilter.maxBaseStats.hp,
      minHP: filters.pokemonFilter.minBaseStats.hp,
      maxAttack: filters.pokemonFilter.maxBaseStats.attack,
      minAttack: filters.pokemonFilter.minBaseStats.attack,
      maxDefense: filters.pokemonFilter.maxBaseStats.defense,
      minDefense: filters.pokemonFilter.minBaseStats.defense,
      maxSpecialAttack: filters.pokemonFilter.maxBaseStats.specialAttack,
      minSpecialAttack: filters.pokemonFilter.minBaseStats.specialAttack,
      maxSpecialDefense: filters.pokemonFilter.maxBaseStats.specialDefense,
      minSpecialDefense: filters.pokemonFilter.minBaseStats.specialDefense,
      maxSpeed: filters.pokemonFilter.maxBaseStats.speed,
      minSpeed: filters.pokemonFilter.minBaseStats.speed,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'quick_search',
      title: "Search Pokemon by name",
      placeholder: "ENTER to save first row",
      backgroundLight: "green"
    }
  });

  const queryVars = useMemo(() => {
    return {
      ...removalVars,
      
      limit: 20,
      orderBy: pagination.orderBy,
      sortBy: pagination.sortBy,

      types: Object.entries(filters.pokemonFilter.types).reduce((acc, [key, value]) => {
        const typeName = key as TypeName;
        // Type-guard
        if (!typeName || key === '__typename') return acc;

        // If type is not selected in filter
        if (!value) return acc;
        
        return acc.concat(toCapsTypeName(typeName));
      }, [] as CapsTypeName[]),

      maxHP: filters.pokemonFilter.maxBaseStats.hp,
      minHP: filters.pokemonFilter.minBaseStats.hp,
      maxAttack: filters.pokemonFilter.maxBaseStats.attack,
      minAttack: filters.pokemonFilter.minBaseStats.attack,
      maxDefense: filters.pokemonFilter.maxBaseStats.defense,
      minDefense: filters.pokemonFilter.minBaseStats.defense,
      maxSpecialAttack: filters.pokemonFilter.maxBaseStats.specialAttack,
      minSpecialAttack: filters.pokemonFilter.minBaseStats.specialAttack,
      maxSpecialDefense: filters.pokemonFilter.maxBaseStats.specialDefense,
      minSpecialDefense: filters.pokemonFilter.minBaseStats.specialDefense,
      maxSpeed: filters.pokemonFilter.maxBaseStats.speed,
      minSpeed: filters.pokemonFilter.minBaseStats.speed,
    };
  }, [removalVars, filters, pagination]);

  // #endregion

  const { data, loading, error } = useDelayedQuery<PokemonQuickSearchQuery, PokemonQuickSearchVars>({
    query: POKEMON_QUICKSEARCH_QUERY,
    queryVars,
    delay: 1000,
  });

  const onPaginationChangeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, orderBy: PokemonColumnName) => {
    e.preventDefault();

    // Reversing sortBy direction
    if (orderBy === pagination.orderBy) {
      setPagination({
        ...pagination,
        sortBy: pagination.sortBy === 'ASC'
          ? 'DESC'
          : 'ASC',
      })
    }
    else {
      setPagination({
        orderBy,
        sortBy: 'ASC',
      });
    }
  }

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, pokemonIconDatum: PokemonIconDatum) => {
    e.preventDefault();

    dispatches.dispatchTeam({
      type: 'toggle_save',
      payload: {
        gen: filters.genFilter.gen,
        pokemon: pokemonIconDatum
      }
    });
  }

  if (error) { return (<div>{error.message}</div>); }

  return (
    <section aria-labelledby="quick-search" className="quick-search__wrapper">
      <h2 id="quick-search" className="hidden-header">Quick search</h2>
      <form>
        {searchBar}
      </form>
      <div className="quick-search__results">
        <ErrorBoundary>
          <div 
            className="quick-search__legend"
          >
            <div
              className="quick-search__name"
            >
              <span onClick={e => onPaginationChangeClick(e, 'POKEMON_SHOWDOWN_ID')}>Name</span>
              <SortSwitch
                titleFor="name"
                onClick={e => onPaginationChangeClick(e, 'POKEMON_SHOWDOWN_ID')}
                sortBy={pagination.orderBy === 'POKEMON_SHOWDOWN_ID' ? pagination.sortBy : null}
              />
            </div>
            
            <div
              className="quick-search__typing"
            >
              Typing
            </div>
            <div
              className="quick-search__tier"
            >
              <span>Tier</span>
              {/* <span onClick={e => onPaginationChangeClick(e, 'tier')}>Tier</span> */}
              {/* <SortSwitch
                titleFor="tier"
                onClick={e => onPaginationChangeClick(e, 'tier')}
                sortBy={pagination.orderBy === 'tier' ? pagination.sortBy : null}
              /> */}
            </div>
            <div className="quick-search__stats">
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'HP')}
              >
                HP
                <SortSwitch
                  titleFor="HP"
                  onClick={e => onPaginationChangeClick(e, 'HP')}
                  sortBy={pagination.orderBy === 'HP' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'ATTACK')}
              >
                Atk
                <SortSwitch
                  titleFor="Attack"
                  onClick={e => onPaginationChangeClick(e, 'ATTACK')}
                  sortBy={pagination.orderBy === 'ATTACK' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'DEFENSE')}
              >
                Def
                <SortSwitch
                  titleFor="Defense"
                  onClick={e => onPaginationChangeClick(e, 'DEFENSE')}
                  sortBy={pagination.orderBy === 'DEFENSE' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'SPECIAL_ATTACK')}
              >
                SpA
                <SortSwitch
                  titleFor="Special Attack"
                  onClick={e => onPaginationChangeClick(e, 'SPECIAL_ATTACK')}
                  sortBy={pagination.orderBy === 'SPECIAL_ATTACK' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'SPECIAL_DEFENSE')}
              >
                SpD
                <SortSwitch
                  titleFor="Special Defense"
                  onClick={e => onPaginationChangeClick(e, 'SPECIAL_DEFENSE')}
                  sortBy={pagination.orderBy === 'SPECIAL_DEFENSE' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'SPEED')}
              >
                Spe
                <SortSwitch
                  titleFor="Speed"
                  onClick={e => onPaginationChangeClick(e, 'SPEED')}
                  sortBy={pagination.orderBy === 'SPEED' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'BASE_STAT_TOTAL')}
              >
                BST
                <SortSwitch
                  titleFor="Base Stat Total"
                  onClick={e => onPaginationChangeClick(e, 'BASE_STAT_TOTAL')}
                  sortBy={pagination.orderBy === 'BASE_STAT_TOTAL' ? pagination.sortBy : null}
                />
              </div>
            </div>
            <div className="quick-search__save-wrapper">
            </div>
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          {loading
            ? <LoadIcon />
            : data && <QuickSearchEntries
                data={data}
                team={team}
                filters={filters}
                onSaveClick={onSaveClick}
                focusedOnInput={focusedOnInput}
              />
          }
        </ErrorBoundary>
      </div>
    </section>
  )
}

export default QuickSearch;