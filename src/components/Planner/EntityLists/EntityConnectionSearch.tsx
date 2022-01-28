import {
  useEffect,
  useState,
} from "react";
import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";

import {
  GenerationNum,
} from '../../../types-queries/helpers';
import {
  ListRenderArgs,
} from "./helpers";

import {
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../hooks/app-hooks';
import { TierFilter } from '../../../utils/smogonLogic';

interface EntityConnectionSearchProps<SearchQuery, SearchQueryVars> {
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter?: TierFilter
  listRender: ({ data, dispatchCart, dispatchTeam }: ListRenderArgs<SearchQuery>) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearch<SearchQuery, SearchQueryVars>({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  listRender,
  query,
  queryVars,
}: EntityConnectionSearchProps<SearchQuery, SearchQueryVars>): JSX.Element {
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(
    query,
    {
      variables: {
        ...queryVars,
      }
    }
  );

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, dispatchCart, dispatchTeam, genFilter, tierFilter, })
      }
    </>
  );
};

export default EntityConnectionSearch;