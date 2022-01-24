import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ItemSearchQuery,
  ItemSearchResult,
  ItemSearchVars,
  ItemInSearch,

  ITEM_SEARCH_QUERY,
} from '../../../../types-queries/Planner/Item';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';
import {
  ListRenderArgs, MissingDispatchError,
} from '../helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  
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
                  key: 'Class', value: item.itemClass,
                },
              ]}
              description={item.description}
            />
          </>
        );
      })}
    </>
  );
}

type ItemSearchProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const ItemSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: ItemSearchProps) => {
  const [queryVars, setQueryVars] = useState<ItemSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: ItemSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={ITEM_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default ItemSearch;