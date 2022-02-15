import MoveSearch from "./MoveSearch";
import { Dispatches, Filters } from "../../App";

type MoveMainProps = {
  dispatches: Dispatches
  filters: Filters
}

const MoveMainPage = ({ 
  dispatches,
  filters,
}: MoveMainProps) => {
  return (
    <MoveSearch 
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default MoveMainPage;