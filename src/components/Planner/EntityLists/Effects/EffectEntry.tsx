import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  EffectInSearch,
} from '../../../../types-queries/Effect';

type EffectEntryProps = {
  effect: EffectInSearch
}

const EffectEntry = ({
  effect
}: EffectEntryProps) => {
  // Since Pokemon can learn Moves in multiple ways, we need to worry about duplicates. The keys of this object are Pokemon names, and the value is always 'true'; we only care about the keys.

  return (
    <div className="planner__table-row">
      {/* Effect name */}
      <Link 
        to={`${effect.name}`}
        className="planner__effect-name"
      >
        {effect.formattedName}
      </Link>
      <Outlet />
    </div>
  );
}

export default EffectEntry;