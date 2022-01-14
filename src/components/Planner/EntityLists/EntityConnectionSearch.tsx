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
} from '../../../types-queries/Generation';
import {
  ListRenderArgs,
} from "./helpers";

import {
  CartAction,
  TeamAction,
} from '../../App';

interface EntityConnectionSearchProps<SearchQuery, SearchQueryVars> {
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  gen: GenerationNum
  handleChange: (newQueryVars: SearchQueryVars) => void,
  listRender: ({ data, dispatchCart, dispatchTeam }: ListRenderArgs<SearchQuery>) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntityConnectionSearch<SearchQuery, SearchQueryVars>({
  dispatchCart,
  dispatchTeam,
  gen,
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

  // searchBox.ready = false means that we have just navigated to the page. If the URL contains search parameters, then a search will execute based on the searchParams.
  // searchBox.ready = true means that we have modified the search box on the page. The next search will take place based on the search box, rather than the searchParams.
  const [searchBox, setSearchBox] = useState('')
  const { data, loading, error } = useQuery<SearchQuery, SearchQueryVars>(
    query,
    {
      variables: {
        ...queryVars,
      }
    }
  );

  // Change queryVars when searchBox is updated.
  useEffect(() => {
    handleChange({
      ...queryVars,
      startsWith: searchBox,
    });
  }, [searchBox]);

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            value={searchBox}
            onChange={(e) => {
              setSearchBox(e.target.value);
            }}
          />
        </form>
      </div>
      {loading 
        ? <div>Loading...</div>
        : data && listRender({ data, dispatchCart, dispatchTeam })
      }
    </>
  );
};

export default EntityConnectionSearch;