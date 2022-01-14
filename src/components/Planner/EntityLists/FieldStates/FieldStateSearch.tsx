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
  FieldStateSearchQuery,
  FieldStateSearchResult,
  FieldStateSearchVars,
  FieldStateInSearch,

  FIELDSTATE_SEARCH_QUERY,
} from '../../../../types-queries/FieldState';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import FieldStateEntry from './FieldStateEntry';
import EntitySearchMain from '../EntitySearchMain';

const listRender = ({ data, }: ListRenderArgs<FieldStateSearchQuery>) => {
  if (!data || !data.fieldStates) return (<div>Data not found for the query 'fieldStates'.</div>);
  
  return (
    <>
      {data.fieldStates.map((fieldState: FieldStateSearchResult) => (
          <>
            <FieldStateEntry
              key={'moveEntry_' + fieldState.id}
              fieldState={new FieldStateInSearch(fieldState)} 
            />
          </>
        ))}
    </>
  );
}

type FieldStateSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const FieldStateSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: FieldStateSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<FieldStateSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: FieldStateSearchVars) => void = (newQueryVars) => {
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
        query={FIELDSTATE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default FieldStateSearch;