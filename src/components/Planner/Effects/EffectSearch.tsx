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
} from '../../../types-queries/Planner/Effect';

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/EntitySearchEntry';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

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
  const [queryVars, setQueryVars] = useGenConnectedSearchVars<EffectSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
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
        genFilter={genFilter}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={EFFECT_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default EffectSearch;