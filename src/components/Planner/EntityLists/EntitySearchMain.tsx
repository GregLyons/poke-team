import {
  DocumentNode,
} from 'graphql';

import {
  useLazyQuery,
} from '@apollo/client';

import {
  GenerationNum,
} from '../../../typeDefs/Generation';
import { useContext, useEffect, useRef, useState } from 'react';
import { GenContext } from '../../../contexts';
import { useSearchParams } from 'react-router-dom';

interface EntitySearchMainProps<SearchQuery, SearchQueryVars> {
  listRender: (data: SearchQuery) => JSX.Element,
  query: DocumentNode,
  queryVars: SearchQueryVars,
  sampleQuery: SearchQuery,
}

function EntitySearchMain<SearchQuery, SearchQueryVars>({
  handleSubmit,
  listRender,
  query,
  queryVars,
  sampleQuery,
}: {
  handleSubmit: any,
  query: DocumentNode,
  queryVars: SearchQueryVars,
  listRender: (data: SearchQuery) => JSX.Element,
  sampleQuery: SearchQuery,
}): JSX.Element {
  const [executeSearch, { data, loading, error }] = useLazyQuery<SearchQuery, SearchQueryVars>(query);

  const { gen, setGen } = useContext(GenContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // searchBox.ready = false means that we have just navigated to the page. If the URL contains search parameters, then a search will execute based on the searchParams.
  // searchBox.ready = true means that we have modified the search box on the page. The next search will take place based on the search box, rather than the searchParams.
  const [searchBox, setSearchBox] = useState({
    value: searchParams.get('startsWith') || '',
    ready: false,
  })

  // Update search on gen change
  const searched = useRef(false);
  useEffect(() => {
    // If we haven't started a search yet, return to avoid doing it automatically
    console.log(gen);
    if (!searched.current) return;

    // If search button is present, execute search
    if (searchButtonRef.current) searchButtonRef.current.click();
  }, [gen]);

  useEffect(() => {
    // If search button is present and searchBox.ready is false, execute search using searchParams
    if (searchButtonRef.current && searchBox.ready === false) 
    searchButtonRef.current.click();
    setSearchBox({
      ...searchBox,
      ready: false,
    })
  }, [searchParams]);

  // Ref so that we can programatically click search button.
  const searchButtonRef = useRef<HTMLButtonElement|null>(null);

  useEffect(() => {
    executeSearch({
      variables: {
        ...queryVars,
      }
    });
  }, [queryVars, executeSearch])

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        searched.current = true;

        if (searchBox.ready) {
          setSearchParams({
            ...searchParams,
            startsWith: searchBox.value,
          });

          handleSubmit({
            startsWith: searchBox.value,
          });
        } 
        else {
          handleSubmit({
            startsWith: searchParams.get('startsWith') || '',
          });
        }
      }}>
        Search
        <input
          type="text"
          value={searchBox.value}
          onChange={(e) => {
            setSearchBox({
              value: e.target.value,
              ready: true,
            });
          }}
        />
        <button
          ref={searchButtonRef}
          type="submit"
        >
          OK
        </button>
      </form>
      {data && listRender(data)}
    </>
  );
};


export default EntitySearchMain;