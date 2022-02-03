import { CartAction } from "../../../../hooks/App/Cart";
import { TeamAction } from "../../../../hooks/App/Team";
import {
  ItemIconDatum,
} from "../../../../types-queries/helpers";
import {
  getItemIcon,
} from "../../../../utils/sprites";

import './Icons.css';

type PlannerItemIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  itemIconDatum: ItemIconDatum
}

const PlannerItemIcon = ({
  dispatchCart,
  dispatchTeam,
  key,
  itemIconDatum,
}: PlannerItemIconProps) => {
  const {left, top} = getItemIcon(itemIconDatum);

  return (
    <div className="planner__item-icon-container"
      style={{
        width: '24px',
        height: '24px',
        display: 'inline-block',
      }}
    >
      <div className="planner__item-icon-background" 
        style={{
          width: '24px',
          height: '24px',
        }}
      />
      <div
        className="planner__item-icon"
        title={`${itemIconDatum.formattedName}`}
        key={key}
        style={{
          width: '24px',
          height: '24px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}
      />
    </div>
  );
};

export default PlannerItemIcon;