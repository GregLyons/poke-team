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

import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../utils/constants';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons, } from '../../../hooks/Searches';
import { listToggleValue } from '../helpers';
import { Dispatches, Filters } from '../../App';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import Button from '../../Reusables/Button/Button';
import MainSearch from '../Searches/MainSearch';
import { ItemClass, ITEM_CLASS_MAP } from '../../../types-queries/entities';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  
  return (
    <>
      {data.items.edges.map((itemSearchResult: ItemSearchResult) => {
        const item = new ItemInSearch(itemSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Item"
              key={'itemEntry_' + item.name}
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

const listFilter = ({
  queryVars,
  setQueryVars,
  searchBar,
}: ListFilterArgs<ItemSearchVars>) => {
  const handleClassSelect = listToggleValue<ItemSearchVars, ItemClass>(queryVars, setQueryVars, 'itemClass');

  return (
    <>
      {searchBar}
      <DropdownMenu
        title="CLASS"
        items={Array.from(ITEM_CLASS_MAP.entries()).map(([key, value]) => {
          const selected = queryVars.itemClass.includes(key);

          return {
            id: key,
            label: (
              <Button
                title={selected
                  ? `Exclude ${value} items.`
                  : `Include ${value} items.`
                }
                label={value}
                active={selected}
                onClick={e => e.preventDefault()}
                disabled={false}
                immediate={false}
              />
            ),
            selected,
          };
        })}
        toggleSelect={handleClassSelect}
        dropdownWidth={'clamp(5vw, 50ch, 80%)'}
        itemWidth={'15ch'}
        backgroundLight="blue"
      />
    </>
  );
}

type ItemSearchProps = {
  dispatches: Dispatches
  filters: Filters
}

const ItemSearch = ({
  dispatches,
  filters,
}: ItemSearchProps) => {
  const { queryVars, filterForm, focusedOnInput, } = useListFilter_removal<ItemSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
      itemClass: Array.from(ITEM_CLASS_MAP.keys()),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search items by name',
      backgroundLight: 'blue',
    },
    listFilter,
  });

  const results = useListRender_icons<ItemSearchQuery, ItemSearchVars>(
    dispatches,
    filters,
    ITEM_SEARCH_QUERY,
    queryVars,
    listRender,
  )

  return (
    <>
      <MainSearch
        filterForm={filterForm}
        results={results}
      />
      <Outlet />
    </>
  );
};

export default ItemSearch;