import {
  useContext, useState,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import {
  GenContext,
} from '../../../../contexts';

import {
  EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars,
  EffectInSearch,

  EFFECT_SEARCH_QUERY,
} from '../../../../types-queries/Effect';

import EffectEntry from './EffectEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = (data: EffectSearchQuery) => {
  if (!data || !data.effects) return (<div>Data not found for the query 'effects'.</div>);
  
  return (
    <>
      {data.effects.map((effect: EffectSearchResult) => (
          <>
            <EffectEntry 
              key={'moveEntry_' + effect.id}
              effect={new EffectInSearch(effect)} 
            />
          </>
        ))}
    </>
  );
}
const EffectSearchMain = () => {
  const { gen } = useContext(GenContext);

  const [queryVars, setQueryVars] = useState<EffectSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: EffectSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain 
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={EFFECT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default EffectSearchMain;