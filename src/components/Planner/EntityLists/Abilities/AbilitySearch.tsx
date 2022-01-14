import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, 
} from '../entityListRender';
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

const listRender = ({ data, }: ListRenderArgs<AbilitySearchQuery>) => {
  if (!data || !data.abilities) return (<div>Data not found for the query 'abilities'.</div>);
  
  return (
    <>
      {data.abilities.map((ability: AbilitySearchResult) => (
          <>
            <AbilityEntry
              key={'moveEntry_' + ability.id}
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
  })

  const handleSubmit: (newQueryVars: AbilitySearchVars) => void = (newQueryVars) => {
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
        query={ABILITY_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default AbilitySearch;