
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


interface EntitySearchPageProps {
  listRender: any,
  pageEntityName: string
  query: DocumentNode,
  queryName: string
  searchKeyName: string
}

export const EntitySearchPage = ({
  listRender,
  pageEntityName,
  query,
  queryName,
  searchKeyName,
}: EntitySearchPageProps) => {

  // Hooks
  const { gen, setGen } = useContext(GenContext);

  // searchBox.ready = false means that we have just navigated to the page. If the URL contains search parameters, then a search will execute based on the searchParams.
  // searchBox.ready = true means that we have modified the search box on the page. The next search will take place based on the search box, rather than the searchParams.
  const [searchBox, setSearchBox] = useState('')
  const { data, loading, error } = useQuery(
    query,
    {
      variables: {
        gen: gen,
        name: pageEntityName,
        startsWith: searchBox,
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
        Search
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
      <div className="planner__table planner__table--move">
        {loading 
          ? (<div>Loading...</div>)
          : data && data[queryName][0][searchKeyName].edges &&
            data[queryName][0][searchKeyName].edges.map((edge: any) => {
              return listRender(edge.node);
            })
        }
      </div>
    </>
  );
};

export default EntitySearchPage;