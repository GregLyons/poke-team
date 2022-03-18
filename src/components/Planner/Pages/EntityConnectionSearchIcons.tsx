import {
  useQuery
} from "@apollo/client";
import {
  DocumentNode
} from 'graphql';
import { ListRenderArgsIcons } from '../../../hooks/Searches';
import { Dispatches, Filters } from '../../App';
import LoadIcon from "../../Reusables/LoadIcon/LoadIcon";
import './Pages.css';

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
        ? <LoadIcon />
        : data && listRender({ data, dispatches, filters, })
      }
    </>
  );
};

export default EntityConnectionSearchIcons;