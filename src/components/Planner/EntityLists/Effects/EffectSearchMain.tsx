import {
  useContext, useState,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import {
  EffectSearchQuery,
  EffectSearchResult,
  EffectSearchVars,
  EffectInSearch,

  EFFECT_SEARCH_QUERY,
} from '../../../../types-queries/Effect';

import EffectEntry from './EffectEntry';
import EntitySearchMain from '../EntitySearchMain';
import { GenerationNum } from '../../../../types-queries/Generation';

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

type EffectSearchMainProps = {
  gen: GenerationNum
}

const EffectSearchMain = ({ gen }: EffectSearchMainProps) => {

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
        gen={gen}
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