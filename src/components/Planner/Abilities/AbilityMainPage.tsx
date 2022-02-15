import { Dispatches, Filters } from "../../App";

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatches: Dispatches
  filters: Filters
}

const AbilityMainPage = ({ 
  dispatches,
  filters,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default AbilityMainPage;