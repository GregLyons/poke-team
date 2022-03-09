import './MainSearch.css';

type MainSearchProps = {
  filterForm: JSX.Element
  results: JSX.Element
}

const MainSearch = ({
  filterForm,
  results,
}: MainSearchProps) => {
  return (
    <div className="planner-search__wrapper">
      <div className="planner-search__filter">
        {filterForm}
      </div>
      <div className="planner-search__results">
        {results}
      </div>
    </div>
  )
};

export default MainSearch;