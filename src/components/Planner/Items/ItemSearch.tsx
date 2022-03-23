import {
  Outlet
} from 'react-router-dom';
import { removedFromBDSP, removedFromSwSh } from '../../../hooks/App/GenFilter';
import { ListFilterArgs, ListRenderArgsIcons, useListFilter_removal_pagination, useListRender_icons } from '../../../hooks/Searches';
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
import Button from '../../Reusables/Button/Button';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DropdownMenu from '../../Reusables/DropdownMenu/DropdownMenu';
import SearchEntry from '../Entries/SearchEntry/SearchEntry';
import { listToggleValue } from '../helpers';
import MainSearch from '../MainSearch/MainSearch';

const listRender = (
  limit: number,
  offset: number,
  onNextPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void, onPrevPageClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
) => (
  { data, dispatches, filters, }: ListRenderArgsIcons<ItemSearchQuery>
) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);

  const count = data.items.count;
  
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
      <li>
        <fieldset className="planner-search__page-change">
          <legend className="hidden-label">Change page</legend>
          <label htmlFor="planner_ability_prev" className="hidden-label">Previous page</label>
          <Button
            title="Previous page"
            label="PREV PAGE"
            id="planner_ability_prev"
    
            active={true}
            onClick={onPrevPageClick}
            disabled={offset - limit < 0}
            immediate={true}
          />
          <label htmlFor="planner_ability_next" className="hidden-label">Next page</label>
          <Button
            title="Next page"
            label="NEXT PAGE"
            id="planner_ability_next"
    
            active={true}
            onClick={onNextPageClick}
            disabled={offset + limit > count}
            immediate={true}
          />
        </fieldset>
      </li>
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
  const { queryVars, filterForm, onNextPageClick, onPrevPageClick, } = useListFilter_removal_pagination<ItemSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
      limit: 10,
      offset: 0,
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
    listRender(queryVars.limit, queryVars.offset, onNextPageClick, onPrevPageClick),
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