import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { BGManager } from '../../../hooks/App/BGManager';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { validatePokemon } from '../../../hooks/App/PokemonFilter';
import { Team } from '../../../hooks/App/Team';
import { useFilterConnectedSearchVars } from '../../../hooks/Builder/Searches';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { PokemonQuickSearchQuery, PokemonQuickSearchResult, PokemonQuickSearchVars, POKEMON_QUICKSEARCH_QUERY, QuickSearchPokemon } from '../../../types-queries/Builder/QuickSearch';
import { PokemonColumnName, PokemonIconDatum, PokemonPaginationInput, SortByEnum } from '../../../types-queries/helpers';
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

  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange]  = useRemovalConnectedSearchVars<PokemonQuickSearchVars>(
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

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => {
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
    <div 
      className="quick-search__wrapper"
    >
      <form>
        <SearchBar
          title="Search Pokemon by name"
          placeholder="Search Pokemon"
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          searchMode={searchMode}
          handleSearchModeChange={handleSearchModeChange}
          backgroundLight="green"
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
              titleFor="name"
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
              titleFor="tier"
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
                titleFor="HP"
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
                titleFor="Attack"
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
                titleFor="Defense"
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
                titleFor="Special Attack"
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
                titleFor="Special Defense"
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
                titleFor="Speed"
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
                titleFor="Base Stat Total"
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
            team={team}
            filters={filters}
            dispatches={dispatches}
            pagination={pagination}
            onSaveClick={onSaveClick}
          />
        }
      </div>
    </div>
  )
}

export default QuickSearch;