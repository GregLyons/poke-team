import TypeSearch from "./TypeSearch"
import { Dispatches, Filters } from "../../App";

type TypeMainPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const TypeMainPage = ({ 
  dispatches,
  filters,
}: TypeMainPageProps) => {
  return (
    <TypeSearch
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default TypeMainPage;