import {
  Link,
  Outlet,
} from 'react-router-dom';

import { 
  ItemInSearch,
} from '../../../../types-queries/Item';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

type ItemEntryProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  item: ItemInSearch
}

const ItemEntry = ({
  dispatchCart,
  dispatchTeam,
  item,
}: ItemEntryProps) => {

  return (
    <div className="planner__main-search-table-row">
      {/* Item name */}
      <Link 
        to={`${item.name}`}
        className="planner__main-search-row-name"
      >
        {item.formattedName}
      </Link>
      <div className="planner__main-search-row-description">
        {item.description}
      </div>
      <Outlet />
    </div>
  );
}

export default ItemEntry;