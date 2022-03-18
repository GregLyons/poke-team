import {
  useQuery
} from "@apollo/client";
import {
  DocumentNode
} from 'graphql';
import { GenFilter } from "../../../hooks/App/GenFilter";
import { ListRenderArgs } from '../../../hooks/Searches';
import LoadIcon from "../../Reusables/LoadIcon/LoadIcon";
import './Pages.css';

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
        ? <LoadIcon />
        : data && listRender({ data, })
      }
    </>
  );
};

export default EntityConnectionSearch;