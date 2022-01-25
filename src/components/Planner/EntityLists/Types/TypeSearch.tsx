import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, MissingDispatchError, MissingGenError, MissingTierFilterError, 
} from '../helpers';
import {
  TypeSearchQuery,
  TypeSearchResult,
  TypeSearchVars,
  TypeInSearch,

  TYPE_SEARCH_QUERY,
} from '../../../../types-queries/Planner/Type';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import { TierFilter } from '../../../../utils/smogonLogic';

const listRender = ({ data, dispatchCart, dispatchTeam, gen, tierFilter, }: ListRenderArgs<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  if (!tierFilter) throw new MissingTierFilterError('Missing tierFilter. Check that you passed tierFilter to the EntitySearchMain component.');
  if (!gen) throw new MissingGenError('Missing gen. Check that you passed gen to the EntitySearchMain component.');
  
  return (
    <>
      {data.types.map((typeSearchResult: TypeSearchResult) => {
        const type = new TypeInSearch(typeSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Type"
              key={'typeEntry_' + type.id}
              name={type.formattedName}
              linkName={type.name}
              description={type.description}
              icons={{
                pokemonIconData: type.pokemonIconData,
                typeIconDatum: type.typeIconDatum,
                dispatchCart,
                dispatchTeam,
                gen,
                tierFilter,
                cartNote: `Pokemon with the Type '${type.formattedName}'.`
              }}
            />
          </>
        );
      })}
    </>
  );
}

type TypeSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const TypeSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: TypeSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<TypeSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: TypeSearchVars) => void = (newQueryVars) => {
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
        tierFilter={tierFilter}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={TYPE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default TypeSearch;