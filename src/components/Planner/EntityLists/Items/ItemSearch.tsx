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
} from '../../../../types-queries/Item';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';
import {
  ListRenderArgs, MissingDispatchError,
} from '../helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import ItemEntry from './ItemEntry';

const listRender = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.')
  
  return (
    <>
      {data.items.map((item: ItemSearchResult) => (
          <>
            <ItemEntry 
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              key={'itemEntry_' + item.id}
              item={new ItemInSearch(item)} 
            />
          </>
        ))}
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