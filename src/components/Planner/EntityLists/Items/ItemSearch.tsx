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
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingPokemonFilterError, MissingTierFilterError,
} from '../helpers';

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
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
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from '../../../../hooks/planner-hooks';

const listRender = ({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, pokemonFilter, }: ListRenderArgs<ItemSearchQuery>) => {
  if (!data || !data.items) return (<div>Data not found for the query 'items'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!genFilter) throw new MissingGenError('Missing genFilter. Check that you passed genFilter to the EntitySearchMain component.');
  if (!pokemonFilter) throw new MissingPokemonFilterError('Missing pokemonFilter. Check that you passed pokemonFilter to the EntitySearchMain component.');
  
  return (
    <>
      {data.items.map((itemSearchResult: ItemSearchResult) => {
        const item = new ItemInSearch(itemSearchResult);

        return (
          <>
            <EntitySearchEntry
              genFilter={genFilter}
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
                pokemonFilter,
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
  pokemonFilter: PokemonFilter
}

const ItemSearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: ItemSearchProps) => {
  const [queryVars, setQueryVars] = useRemovalConnectedSearchVars<ItemSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }


  return (
    <>
      <EntitySearchMain 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        genFilter={genFilter}
        tierFilter={tierFilter}
        pokemonFilter={pokemonFilter}
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