import ItemSearch from "./ItemSearch";
import { Dispatches, Filters } from "../../App";

type ItemMainProps = {
  dispatches: Dispatches
  filters: Filters
}

const ItemMainPage = ({ 
  dispatches,
  filters,
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatches={dispatches}
      filters={filters}
    />
  )
}

export default ItemMainPage;