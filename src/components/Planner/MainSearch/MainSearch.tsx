import { useRef } from 'react';
import ErrorBoundary from '../../Reusables/ErrorBoundary/ErrorBoundary';
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
      <ErrorBoundary>
        <form
          ref={filterRef}
          role="search"
          className="planner-search__filter"
        >
          {filterForm}
        </form>
      </ErrorBoundary>
      <ErrorBoundary>
        <ul
          className="planner-search__results"
          style={{
            height: filterRef.current
              ? `calc(100% - ${filterRef.current.offsetHeight})`
              : ''
          }}
        >
          {results}
        </ul>
      </ErrorBoundary>
    </div>
  )
};

export default MainSearch;