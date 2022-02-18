import { validatePokemon } from "../../../hooks/App/PokemonFilter";
import { PokemonQuickSearchQuery, PokemonQuickSearchResult, QuickSearchPokemon } from "../../../types-queries/Builder/QuickSearch";
import { Dispatches, Filters } from "../../App";
import QuickSearchEntry from "./QuickSearchEntry";

import './QuickSearch.css';
import { compareTiers, DoublesTier, getTier, SinglesTier } from "../../../utils/smogonLogic";
import { PokemonIconDatum, PokemonPaginationInput } from "../../../types-queries/helpers";
import { useEffect, useMemo, useState } from "react";

type QuickSearchEntriesProps = {
  data: PokemonQuickSearchQuery
  dispatches: Dispatches
  filters: Filters
  pagination: {
    orderBy: QuickSearchPokemonEntryKey
    sortBy: 'ASC' | 'DESC'
  }
}

type QuickSearchPokemonEntry = {
  pokemonIconDatum: PokemonIconDatum
  baseStatTotal: number
  tier: SinglesTier | DoublesTier
}

type QuickSearchPokemonEntryKey = 'psID' | 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'baseStatTotal' | 'tier';

const sortHelper: (el1: number | string, el2: number | string) => number = (el1, el2) => {
  if (el1 > el2) return 1;
  else if (el1 === el2) return 0;
  return -1;
}

const sortPokemonByKey: (pagination: PokemonPaginationInput) => ((qspe1: QuickSearchPokemonEntry, qspe2: QuickSearchPokemonEntry) => number) = pagination => {
  const { orderBy, sortBy, } = pagination;
  const sign = sortBy === 'ASC' ? 1 : -1;
  return (qspe1: QuickSearchPokemonEntry, qspe2: QuickSearchPokemonEntry) => {
    switch(orderBy) {
      case 'psID':
        return sign * sortHelper(qspe1.pokemonIconDatum[orderBy], qspe2.pokemonIconDatum[orderBy]);
      case 'tier':
        return sign * compareTiers(qspe1.tier, qspe2.tier);
      case 'baseStatTotal':
        return sign * sortHelper(qspe1.baseStatTotal, qspe2.baseStatTotal);
      default:
        return sign * sortHelper(qspe1.pokemonIconDatum.baseStats[orderBy], qspe2.pokemonIconDatum.baseStats[orderBy]);
    }
  }
}

const QuickSearchEntries = ({
  data,
  dispatches,
  filters,
  pagination,
}: QuickSearchEntriesProps) => {
  // State for keeping track of when the entries need to be re-sorted or re-filtered
  const [filtered, setFiltered] = useState(false);
  const [sorted, setSorted] = useState(false);

  // Original entries, which depend only on the data coming in
  // Also add a dependence on filters.tierFilter.format to display proper tier
  // We perform our initial sort here rather than letting it be handled in the definition of entries 
  const originalEntries: QuickSearchPokemonEntry[] | undefined = useMemo(() => {
    console.log('Recalculating original entries...');
    return data && data?.pokemon.edges.map((pokemonSearchResult: PokemonQuickSearchResult) => {
      const { pokemonIconDatum, baseStatTotal } = (new QuickSearchPokemon(pokemonSearchResult));
      const tier = getTier(filters.genFilter.gen, filters.tierFilter.format, pokemonIconDatum.psID);

      return {
        pokemonIconDatum,
        baseStatTotal,
        tier,
      };
    }).sort(sortPokemonByKey(pagination));
  }, [data, filters.genFilter.gen, filters.tierFilter.format]);

  // Entries to be rendered, which should be sorted and filtered according to orderByKey and filters, respectively
  // If we were to perform our initial sort here, then the unsorted array shows for a brief moment before being sorted
  const [entries, setEntries] = useState<QuickSearchPokemonEntry[] | undefined>(
    originalEntries && originalEntries.reduce((acc: QuickSearchPokemonEntry[], entry: QuickSearchPokemonEntry) => {
      const { pokemonIconDatum, baseStatTotal } = entry;

      if (!validatePokemon({
        pokemonIconDatum,
        ...filters,
      }).validated) return acc;

      const tier = getTier(filters.genFilter.gen, filters.tierFilter.format, pokemonIconDatum.psID);

      return acc.concat([{
        pokemonIconDatum,
        baseStatTotal,
        tier,
      }]);
    }, [])
  );

  // When orderByKey changes, the entries are no longer sorted
  useEffect(() => {
    setSorted(false);
  }, [pagination, originalEntries, setSorted]);
  // When the entries are not sorted, sort them
  useEffect(() => {
    if (!data) return;
    if (!sorted) {
      if (!entries) return;

      // Use entries, since changing the sort criteria does not add or remove Pokemon
      setEntries([...entries].sort(sortPokemonByKey(pagination)))
      setSorted(true);
    }
  }, [setEntries, originalEntries, entries, sorted, setSorted, pagination, data]);

  // When filters change, the entries are no longer filtered
  useEffect(() => {
    setFiltered(false);
  }, [filters, originalEntries, setFiltered]);
  // When the entries are not filtered, filter them
  useEffect(() => {
    if (!data) return;
    if (!filtered) {
      // Use originalEntries, since changing the filter may add in Pokemon previously excluded from entries
      setEntries([...originalEntries].filter(qspe => validatePokemon({ pokemonIconDatum: qspe.pokemonIconDatum, ...filters, }).validated))
      setFiltered(true);
    }
  }, [setEntries, originalEntries, filtered, filters, data]);

  if (!data || !data.pokemon) return (<div>Data not found for the query 'pokemon'.</div>);

  return (
    <div
      className="quick-search__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <QuickSearchEntry
            key={`quickSearchEntry_${entry.pokemonIconDatum.psID}_${entry.pokemonIconDatum.formattedName}`}
            pokemon={entry.pokemonIconDatum}
            baseStatTotal={entry.baseStatTotal}
            tier={entry.tier}
          />
        )
      })}
    </div>
  )
}

export default QuickSearchEntries;