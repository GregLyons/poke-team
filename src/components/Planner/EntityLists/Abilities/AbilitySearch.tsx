import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, MissingDispatchError, 
} from '../helpers';
import {
  AbilitySearchQuery,
  AbilitySearchResult,
  AbilitySearchVars,
  AbilityInSearch,

  ABILITY_SEARCH_QUERY,
} from '../../../../types-queries/Ability';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import AbilityEntry from './AbilityEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.')
  
  return (
    <>
      {data.abilities.map((ability: AbilitySearchResult) => (
          <>
            <AbilityEntry
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              key={'abilityEntry_' + ability.id}
              ability={new AbilityInSearch(ability)} 
            />
          </>
        ))}
    </>
  );
}

type AbilitySearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const AbilitySearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: AbilitySearchMainProps) => {

  const [queryVars, setQueryVars] = useState<AbilitySearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  });

  const handleSubmit: (newQueryVars: AbilitySearchVars) => void = (newQueryVars) => {
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
        query={ABILITY_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;