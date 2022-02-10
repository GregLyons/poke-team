import {
  Outlet,
} from 'react-router-dom';

import {
  ItemSearchQuery,
  ItemSearchResult,
  ItemSearchVars,
  ItemInSearch,

  ITEM_SEARCH_QUERY,
} from '../../../types-queries/Planner/Item';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../utils/constants';
import { useRemovalConnectedSearchVars } from '../../../hooks/Planner/MainSearches';
import { ListRenderArgsIcons } from '../helpers';
import { PokemonIconDispatches, PokemonIconFilters } from '../../App';
import EntitySearchMainIcons from '../Searches/EntitySearchMainIcons';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  
  return (
    <>
      {data.items.map((itemSearchResult: ItemSearchResult) => {
        const item = new ItemInSearch(itemSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Item"
              key={'itemEntry_' + item.id}
              name={item.formattedName}
              linkName={item.name}
              data={[
                {
                  key: 'CLASS', title: 'Item class', value: ENUMCASE_TO_TITLECASE(item.itemClass),
                },
              ]}
              description={item.description}
              icons={{
                pokemonIconData: item.requiredPokemonIconData,
                linkIconDatum: {
                  iconClass: 'item',
                  iconDatum: item.itemIconDatum,
                },
                dispatches,
                filters,
                cartNote: `Pokemon who have '${item.formattedName}'.`
              }}
            />
          </>
        );
      })}
    </>
  );
}

type ItemSearchProps = {
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const ItemSearch = ({
  dispatches,
  filters,
}: ItemSearchProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<ItemSearchVars>(
    {
      gen: filters.genFilter.gen,
      startsWith: '',
      limit: 5,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    filters.genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }


  return (
    <>
      <EntitySearchMainIcons
        dispatches={dispatches}
        filters={filters}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={ITEM_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default ItemSearch;