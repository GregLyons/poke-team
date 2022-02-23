import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";

import { GenFilter } from "../../../hooks/App/GenFilter";

import './Pages.css';
import { ListRenderArgs } from '../../../hooks/Searches';


interface EntityConnectionSearchProps<SearchQuery, SearchQueryVars> {
  genFilter: GenFilter
  listRender: ({ data, }: ListRenderArgs<SearchQuery>) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearch<SearchQuery, SearchQueryVars>({
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
        : data && listRender({ data, })
      }
    </>
  );
};

export default EntityConnectionSearch;