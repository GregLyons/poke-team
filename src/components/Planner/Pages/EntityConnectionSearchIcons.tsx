import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";

import './Pages.css';
import { Dispatches, Filters } from '../../App';
import { ListRenderArgsIcons } from '../../../hooks/Planner/MainSearches';


interface EntityConnectionSearchIconsProps<SearchQuery, SearchQueryVars> {
  dispatches: Dispatches
  filters: Filters
  listRender: ({data, dispatches, filters, }: ListRenderArgsIcons<SearchQuery>) => JSX.Element
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearchIcons<SearchQuery, SearchQueryVars>({
  dispatches,
  filters,
  listRender,
  query,
  queryVars,
}: EntityConnectionSearchIconsProps<SearchQuery, SearchQueryVars>): JSX.Element {
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
        : data && listRender({ data, dispatches, filters, })
      }
    </>
  );
};

export default EntityConnectionSearchIcons;