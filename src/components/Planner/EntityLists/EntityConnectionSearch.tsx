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
  TeamAction,
} from '../../App';
import { TierFilter } from "../../../utils/constants";

interface EntityConnectionSearchProps<SearchQuery, SearchQueryVars> {
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter?: TierFilter
  handleChange: (newQueryVars: SearchQueryVars) => void,
  listRender: ({ data, dispatchCart, dispatchTeam }: ListRenderArgs<SearchQuery>) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearch<SearchQuery, SearchQueryVars>({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
  handleChange,
  listRender,
  query,
  queryVars,
}: EntityConnectionSearchProps<SearchQuery, SearchQueryVars>): JSX.Element {
  useEffect(() => {
    handleChange({
      ...queryVars,
      gen: gen,
    })
  }, [gen])

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
        : data && listRender({ data, dispatchCart, dispatchTeam, gen, tierFilter, })
      }
    </>
  );
};

export default EntityConnectionSearch;