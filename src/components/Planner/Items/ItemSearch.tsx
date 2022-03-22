import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal, useListRender_icons } from '../../../hooks/Searches';
import { ItemClass, ITEM_CLASS_MAP, ITEM_TITLE_MAP } from '../../../types-queries/entities';
import {
  ItemInSearch, ItemSearchQuery,
  ItemSearchResult,
  ItemSearchVars, ITEM_SEARCH_QUERY
} from '../../../types-queries/Planner/Item';
import {
  ENUMCASE_TO_TITLECASE
} from '../../../utils/constants';
import { Dispatches, Filters } from '../../App';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue } from '../helpers';
import MainSearch from '../MainSearch/MainSearch';

const listRender = ({ data, dispatches, filters, }: ListRenderArgsIcons<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  
  return (
    <>
      {data.items.edges.map((itemSearchResult: ItemSearchResult) => {
        const item = new ItemInSearch(itemSearchResult);

        return (
          <SearchEntry
            entityClass="Item"
            key={item.name}
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
      <label htmlFor="item_class_filter_trigger" className="hidden-label">Item class dropdown</label>
      <DropdownMenu
        triggerID="item_class_filter_trigger"
        label="CLASS"

        content={<fieldset>
          <legend className="hidden-label">Item class filter</legend>
          {Array.from(ITEM_CLASS_MAP.entries()).map(([key, value]) => {
            const checked = queryVars.itemClass.includes(key);
  
            return <Checkbox
              key={key}

              id={key + '_item_class'}
              label={value}
              title={checked
                ? `Exclude ${ITEM_TITLE_MAP.get(key)}.`
                : `Include ${ITEM_TITLE_MAP.get(key)}.`
              }

              checked={checked}
              onChange={handleClassSelect(key)}
            />
          })}
        </fieldset>}

        dropdownWidth={'clamp(10vw, 15ch, 30%)'}
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
  const { queryVars, filterForm, } = useListFilter_removal<ItemSearchVars>({
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
      id: 'planner_item_search',
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