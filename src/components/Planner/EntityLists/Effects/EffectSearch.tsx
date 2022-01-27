import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, 
} from '../helpers';
import {
  EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars,
  EffectInSearch,

  EFFECT_SEARCH_QUERY,
} from '../../../../types-queries/Planner/Effect';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, }: ListRenderArgs<EffectSearchQuery>) => {
  if (!data || !data.effects) return (<div>Data not found for the query 'effects'.</div>);
  
  return (
    <>
      {data.effects.map((effectSearchResult: EffectSearchResult) => {
        const effect = new EffectInSearch(effectSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="Effect"
              key={'effectEntry_' + effect.id}
              name={effect.formattedName}
              linkName={effect.name}
              description={effect.description}
            />
          </>
        );
      })}
    </>
  );
}

type EffectSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
}

const EffectSearch = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
}: EffectSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<EffectSearchVars>({
    gen: genFilter.gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: EffectSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain
        genFilter={genFilter}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={EFFECT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default EffectSearch;