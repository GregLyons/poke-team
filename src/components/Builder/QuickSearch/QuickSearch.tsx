import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { BGManager } from '../../../hooks/App/BGManager';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { validatePokemon } from '../../../hooks/App/PokemonFilter';
import { Team } from '../../../hooks/App/Team';
import { useFilterConnectedSearchVars } from '../../../hooks/Builder/Searches';
import { PokemonQuickSearchQuery, PokemonQuickSearchResult, PokemonQuickSearchVars, POKEMON_QUICKSEARCH_QUERY, QuickSearchPokemon } from '../../../types-queries/Builder/QuickSearch';
import { PokemonColumnName, PokemonPaginationInput, SortByEnum } from '../../../types-queries/helpers';
import { Dispatches, Filters } from '../../App';
import SearchBar from '../../Reusables/SearchBar/SearchBar';
import SortSwitch from '../../Reusables/SortSwitch/SortSwitch';
import './QuickSearch.css';
import QuickSearchEntries from './QuickSearchEntries';
import QuickSearchEntry from './QuickSearchEntry';

type QuickSearchProps = {
  bgManager: BGManager
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const QuickSearch = ({
  bgManager,
  dispatches,
  filters,
  team,
}: QuickSearchProps) => {
  const [pagination, setPagination] = useState<PokemonPaginationInput>({
    orderBy: 'psID',
    sortBy: 'ASC',
  });

  const [queryVars, setQueryVars] = useFilterConnectedSearchVars<PokemonQuickSearchVars>(
    {
      gen: filters.genFilter.gen,
      startsWith: '',
      contains: '',
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    }, 
    filters.genFilter,
  );

  const { data, loading, error } = useQuery<PokemonQuickSearchQuery, PokemonQuickSearchVars>(POKEMON_QUICKSEARCH_QUERY, {
    variables: queryVars,
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

  const [searchBox, setSearchBox] = useState('');
  const [searchMode, setSearchMode] = useState<'STARTS' | 'CONTAINS'>('STARTS');

  const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchBox(e.target.value);
    setQueryVars({
      ...queryVars,
      contains: e.target.value,
    });
  }

  const onModeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => {
    e.preventDefault();

    setSearchMode(mode);
    setQueryVars({
      ...queryVars,

    })
  }

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div 
      className="quick-search__wrapper"
    >
      <div className="quick-search__padder">
        <form>
          Search
          <SearchBar
            searchTerm={searchBox}
            handleSearchTermChange={onSearchBarChange}
            searchMode={searchMode}
            handleSearchModeChange={onModeChange}
          />
        </form>
        <div className="quick-search__results">
          <div 
            className="quick-search__legend"
          >
            <div
              className="quick-search__name"
            >
              <span onClick={e => onPaginationChangeClick(e, 'psID')}>Name</span>
              <SortSwitch
                onClick={e => onPaginationChangeClick(e, 'psID')}
                sortBy={pagination.orderBy === 'psID' ? pagination.sortBy : null}
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
              <span onClick={e => onPaginationChangeClick(e, 'tier')}>Tier</span>
              <SortSwitch
                onClick={e => onPaginationChangeClick(e, 'tier')}
                sortBy={pagination.orderBy === 'tier' ? pagination.sortBy : null}
              />
            </div>
            <div className="quick-search__stats">
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'hp')}
              >
                HP
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'hp')}
                  sortBy={pagination.orderBy === 'hp' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'attack')}
              >
                Atk
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'attack')}
                  sortBy={pagination.orderBy === 'attack' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'defense')}
              >
                Def
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'defense')}
                  sortBy={pagination.orderBy === 'defense' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'specialAttack')}
              >
                SpA
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'specialAttack')}
                  sortBy={pagination.orderBy === 'specialAttack' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'specialDefense')}
              >
                SpD
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'specialDefense')}
                  sortBy={pagination.orderBy === 'specialDefense' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'speed')}
              >
                Spe
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'speed')}
                  sortBy={pagination.orderBy === 'speed' ? pagination.sortBy : null}
                />
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'baseStatTotal')}
              >
                BST
                <SortSwitch
                  onClick={e => onPaginationChangeClick(e, 'baseStatTotal')}
                  sortBy={pagination.orderBy === 'baseStatTotal' ? pagination.sortBy : null}
                />
              </div>
            </div>
            <div className="quick-search__save-wrapper">
            </div>
          </div>
          {loading
            ? <div>Loading...</div>
            : data && <QuickSearchEntries
              data={data}
              filters={filters}
              dispatches={dispatches}
              pagination={pagination}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default QuickSearch;