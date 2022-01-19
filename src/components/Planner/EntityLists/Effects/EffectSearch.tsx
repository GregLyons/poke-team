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
} from '../../../../types-queries/Effect';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

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
              entityClass="effects"
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
  gen: GenerationNum
}

const EffectSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: EffectSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<EffectSearchVars>({
    gen: gen,
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

export default EffectSearch;