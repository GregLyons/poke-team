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
  TypeSearchQuery,
  TypeSearchResult,
  TypeSearchVars,
  TypeInSearch,

  TYPE_SEARCH_QUERY,
} from '../../../../types-queries/Type';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, }: ListRenderArgs<TypeSearchQuery>) => {
  if (!data || !data.types) return (<div>Data not found for the query 'types'.</div>);
  
  return (
    <>
      {data.types.map((typeSearchResult: TypeSearchResult) => {
        const type = new TypeInSearch(typeSearchResult);
        
        return (
          <>
            <EntitySearchEntry
              entityClass="types"
              key={'typeEntry_' + type.id}
              name={type.formattedName}
              linkName={type.name}
              description={type.description}
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
}

const TypeSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
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
        gen={gen}
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