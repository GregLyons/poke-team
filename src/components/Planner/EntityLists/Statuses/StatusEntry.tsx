import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  StatusInSearch,
} from '../../../../types-queries/Status';

type StatusEntryProps = {
  status: StatusInSearch
}

const StatusEntry = ({
  status,
}: StatusEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.

  return (
    <div className="planner__main-search-table-row">
      {/* FieldState name */}
      <Link 
        to={`${status.name}`}
        className="planner__main-search-row-name"
      >
        {status.formattedName}
      </Link>
      <div className="planner__main-search-row-description">
        {status.description}
      </div>
      <Outlet />
    </div>
  );
}

export default StatusEntry;