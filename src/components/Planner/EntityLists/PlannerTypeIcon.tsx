import {
  GenerationNum,
  TypeIconDatum,
} from "../../../types-queries/helpers";
import {
  getTypeIcon,
} from "../../../utils/sprites";

import {
  CartAction,
  TeamAction,
} from "../../App";

type PlannerTypeIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  typeIconData: {
    type: TypeIconDatum
    gen: GenerationNum
  }
}

const PlannerTypeIcon = ({
  key,
  typeIconData,
}: PlannerTypeIconProps) => {
  const {left, top} = getTypeIcon(typeIconData.type.name, typeIconData.gen);
  
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
        className={`planner__type-icon--${typeIconData.gen < 6 ? 5 : 8}`}
        title={`Icon for the Type ${typeIconData.type.formattedName}`}
        key={key}
        style={{
          width: typeIconData.gen < 6 ? '32px' : '200px',
          height: typeIconData.gen < 6 ? '12px' : '44px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}
      />
    </div>
  );
};

export default PlannerTypeIcon;