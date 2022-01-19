import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  StatInSearch,
} from '../../../../types-queries/Stat';

type StatEntryProps = {
  stat: StatInSearch
}

const StatEntry = ({
  stat,
}: StatEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.

  return (
    <div className="planner__search-row">
      {/* Stat name */}
      <Link 
        to={`${stat.name}`}
        className="planner__search-row-name"
      >
        {stat.formattedName}
      </Link>
      <div className="planner__search-row-description">
        {stat.description}
      </div>
      <Outlet />
    </div>
  );
}

export default StatEntry;