import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { BGManager } from '../../../hooks/App/BGManager';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { validatePokemon } from '../../../hooks/App/PokemonFilter';
import { Team } from '../../../hooks/App/Team';
import { useFilterConnectedSearchVars } from '../../../hooks/Builder/Searches';
import { PokemonQuickSearchQuery, PokemonQuickSearchResult, PokemonQuickSearchVars, POKEMON_QUICKSEARCH_QUERY, QuickSearchPokemon } from '../../../types-queries/Builder/QuickSearch';
import { Dispatches, Filters } from '../../App';
import './QuickSearch.css';
import QuickSearchEntry from './QuickSearchEntry';

type QuickSearchEntriesProps = {
  data: PokemonQuickSearchQuery
  dispatches: Dispatches
  filters: Filters
}

const QuickSearchEntries = ({
  data,
  dispatches,
  filters,
}: QuickSearchEntriesProps) => {
  if (!data || !data.pokemon) return (<div>Data not found for the query 'pokemon'.</div>);

  console.log('Re-validating...');

  return (
    <>
      {data.pokemon.map((pokemonSearchResult: PokemonQuickSearchResult) => {
        const pokemonIconDatum = (new QuickSearchPokemon(pokemonSearchResult)).pokemonIconDatum;

        if (!validatePokemon({
          pokemonIconDatum,
          ...filters,
        }).validated) return;

        return (
          <>
            <QuickSearchEntry
              key={`quickSearchEntry_` + pokemonIconDatum.id}
              pokemon={pokemonIconDatum}
            />
          </>
        )
      })}
    </>
  )
}

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

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div 
      className="quick-search_wrapper"
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
      </div>
      <div className="quick-search__results">
        <div 
          className="quick-search__legend"
        >
          <div className="quick-search__-name">
            Name
          </div>
          <div className="quick-search__typing">
            Typing
          </div>
          <div className="quick-search__stats">
            <div className="quick-search__stat">&nbsp;HP</div>
            <div className="quick-search__stat">Atk</div>
            <div className="quick-search__stat">Def</div>
            <div className="quick-search__stat">SpA</div>
            <div className="quick-search__stat">Def</div>
            <div className="quick-search__stat">SpD</div>
          </div>
        </div>
        {loading
          ? <div>Loading...</div>
          : data && <QuickSearchEntries 
            data={data}
            filters={filters}
            dispatches={dispatches}
          />
        }
      </div>
    </div>
  )
}

export default QuickSearch;