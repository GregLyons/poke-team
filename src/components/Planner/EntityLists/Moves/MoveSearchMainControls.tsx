import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GenContext } from "../../../../contexts";
import { stringToGenNumber } from "../../../../typeDefs/Generation";
import { MoveSearchQueryVars } from "./moveQueries";

const MoveSearchMainControls = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let queryVars: MoveSearchQueryVars = {
      gen: gen,
      startsWith: '',
      limit: 5,
    };

    // We've completed a search, so now we can update search based on gen
    searched.current = true;

    // Execute search using value in searchBox
    if (searchBox.ready) {
      setSearchParams({
        ...searchParams,
        startsWith: searchBox.value,
      });

      queryVars.startsWith = searchBox.value;
    }
    // Execute search using searchParams
    else {
      queryVars.startsWith = searchParams.get('startsWith') || '';
    }

    return queryVars;
  };

  return (
      <form onSubmit={handleSubmit}>
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
    )
}

export default MoveSearchMainControls;