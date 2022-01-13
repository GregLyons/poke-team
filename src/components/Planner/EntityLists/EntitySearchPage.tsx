
import {
  DocumentNode,
} from 'graphql';
import {
  useQuery,
} from "@apollo/client";
import {
  useContext,
  useState,
} from "react";
import {
  GenContext,
} from "../../../contexts";


interface EntitySearchPageProps<SearchQuery, SearchQueryVars> {
  handleChange: (newQueryVars: SearchQueryVars) => void,
  listRender: (data: SearchQuery) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
}

function EntitySearchPage<SearchQuery, SearchQueryVars>({
  handleChange,
  listRender,
  query,
  queryVars,
}: EntitySearchPageProps<SearchQuery, SearchQueryVars>): JSX.Element {

  // Hooks
  const { gen, setGen } = useContext(GenContext);

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

  if (error) { return (<div>{error.message}</div>)}
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div>
        <form onChange={(e) => {
          handleChange({
            ...queryVars,
            startsWith: searchBox,
          })
        }}>
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
        : data && listRender(data)
      }
    </>
  );
};

export default EntitySearchPage;