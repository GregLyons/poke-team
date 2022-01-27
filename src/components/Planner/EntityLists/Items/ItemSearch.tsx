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
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingTierFilterError,
} from '../helpers';

import { 
  CartAction,
  GenFilter,
  removedFromBDSP,
  removedFromSwSh,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import {
  ENUMCASE_TO_TITLECASE,
} from '../../../../utils/constants';
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, }: ListRenderArgs<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed gen to the EntitySearchMain component.');
  
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
                  key: 'Class', value: ENUMCASE_TO_TITLECASE(item.itemClass),
                },
              ]}
              description={item.description}
              icons={{
                pokemonIconData: item.requiredPokemonIconData,
                itemIconDatum: item.itemIconDatum,
                dispatchCart,
                dispatchTeam,
                genFilter,
                tierFilter,
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
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const ItemSearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: ItemSearchProps) => {
  const [queryVars, setQueryVars] = useState<ItemSearchVars>({
    gen: genFilter.gen,
    startsWith: '',
    limit: 300,
    removedFromSwSh: removedFromSwSh(genFilter),
    removedFromBDSP: removedFromBDSP(genFilter),
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
        genFilter={genFilter}
        tierFilter={tierFilter}
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