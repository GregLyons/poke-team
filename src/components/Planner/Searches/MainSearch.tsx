import './Searches.css';

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
      <form>
        {filterForm}
      </form>
      <div className="planner-search__results">
        {results}
      </div>
    </div>
  )
};

export default MainSearch;