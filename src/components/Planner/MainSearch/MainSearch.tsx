import { useRef } from 'react';
import './MainSearch.css';

type MainSearchProps = {
  filterForm: JSX.Element
  results: JSX.Element
}

const MainSearch = ({
  filterForm,
  results,
}: MainSearchProps) => {
  const filterRef = useRef<HTMLFormElement>(null);
  return (
    <div className="planner-search__wrapper">
      <form
        ref={filterRef}
        role="search"
        className="planner-search__filter"
      >
        {filterForm}
      </form>
      <div
        className="planner-search__results"
        style={{
          height: filterRef.current
            ? `calc(100% - ${filterRef.current.offsetHeight})`
            : ''
        }}
      >
        {results}
      </div>
    </div>
  )
};

export default MainSearch;