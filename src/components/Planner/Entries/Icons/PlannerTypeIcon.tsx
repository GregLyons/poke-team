import { CartAction } from "../../../../hooks/App/Cart";
import { GenFilter } from "../../../../hooks/App/GenFilter";
import { TeamAction } from "../../../../hooks/App/Team";
import {
  TypeIconDatum,
} from "../../../../types-queries/helpers";
import {
  getTypeIcon,
} from "../../../../utils/sprites";

import './Icons.css';

type PlannerTypeIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  typeIconData: {
    type: TypeIconDatum
    genFilter: GenFilter
  }
}

const PlannerTypeIcon = ({
  key,
  typeIconData,
}: PlannerTypeIconProps) => {
  const {left, top} = getTypeIcon(typeIconData.type.name, typeIconData.genFilter.gen);
  const useGen5 = true || typeIconData.genFilter.gen < 6;
  
  return (
    <div className="planner__type-icon-container"
      style={{
        width: '100px',
        height: '22px',
        display: 'inline-block',
      }}
    >
      <div className="planner__type-icon-background" 
        style={{
          width: '100px',
          height: '22px',
        }}
      />
      <div
        className={`planner__type-icon--${useGen5 
          ? 5
          : 8}
        `}
        title={`${typeIconData.type.formattedName}`}
        key={key}
        style={{
          width: useGen5 
            ? '32px'
            : '200px',
          height: useGen5 
            ? '12px'
            : '44px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}
      />
    </div>
  );
};

export default PlannerTypeIcon;