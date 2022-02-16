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
      contains: '',
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    }, 
    filters.genFilter,
  );

  const { data, loading, error } = useQuery<PokemonQuickSearchQuery, PokemonQuickSearchVars>(POKEMON_QUICKSEARCH_QUERY, {
    variables: queryVars,
  });

  const [searchBox, setSearchBox] = useState('');

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

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div 
      className="quick-search__wrapper"
    >
      <div className="quick-search__padder">
        <form>
          Search
          <input type="text" 
            value={searchBox}
            onChange={(e) => {
              setSearchBox(e.target.value);
              setQueryVars({
                ...queryVars,
                contains: e.target.value,
              })
            }}
          />
        </form>
        <div className="quick-search__results">
          <div 
            className="quick-search__legend"
          >
            <div 
              className="quick-search__name"
              onClick={e => onPaginationChangeClick(e, 'psID')}
            >
              Name
            </div>
            <div
              className="quick-search__typing"
            >
              Typing
            </div>
            <div
              className="quick-search__tier"
              onClick={e => onPaginationChangeClick(e, 'tier')}
            >
              Tier
            </div>
            <div className="quick-search__stats">
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'hp')}
              >
                HP&nbsp;
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'attack')}
              >
                Atk
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'defense')}
              >
                Def
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'specialAttack')}
              >
                SpA
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'specialDefense')}
              >
                SpD
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'speed')}
              >
                Spe
              </div>
              <div
                className="quick-search__stat"
                onClick={e => onPaginationChangeClick(e, 'baseStatTotal')}
              >
                BST
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