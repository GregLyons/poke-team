import { validatePokemon } from "../../../hooks/App/PokemonFilter";
import { PokemonQuickSearchQuery, PokemonQuickSearchResult, QuickSearchPokemon } from "../../../types-queries/Builder/QuickSearch";
import { Dispatches, Filters } from "../../App";
import QuickSearchEntry from "./QuickSearchEntry";

import './QuickSearch.css';
import { getTier } from "../../../utils/smogonLogic";

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
    <div
      className="quick-search__entries-wrapper"
    >
      {data.pokemon.map((pokemonSearchResult: PokemonQuickSearchResult) => {
        const pokemonIconDatum = (new QuickSearchPokemon(pokemonSearchResult)).pokemonIconDatum;

        if (!validatePokemon({
          pokemonIconDatum,
          ...filters,
        }).validated) return;

        const tier = getTier(filters.genFilter.gen, filters.tierFilter.format, pokemonIconDatum.psID);

        return (
          <>
            <QuickSearchEntry
              key={`quickSearchEntry_` + pokemonIconDatum.id}
              pokemon={pokemonIconDatum}
              tier={tier}
            />
          </>
        )
      })}
    </div>
  )
}

export default QuickSearchEntries;