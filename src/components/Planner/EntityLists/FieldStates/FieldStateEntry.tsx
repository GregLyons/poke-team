import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  FieldStateInSearch,
} from '../../../../types-queries/FieldState';

type FieldStateEntryProps = {
  fieldState: FieldStateInSearch
}

const FieldStateEntry = ({
  fieldState,
}: FieldStateEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.

  return (
    <div className="planner__table-row">
      {/* FieldState name */}
      <Link 
        to={`${fieldState.name}`}
        className="planner__fieldState-name"
      >
        {fieldState.formattedName}
      </Link>
      <Outlet />
    </div>
  );
}

export default FieldStateEntry;