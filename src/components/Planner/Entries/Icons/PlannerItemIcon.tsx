import {
  ItemIconDatum,
} from "../../../../types-queries/helpers";
import {
  getItemIcon,
} from "../../../../utils/sprites";
import { Dispatches } from "../../../App";

import './Icons.css';

type PlannerItemIconProps = {
  dispatches: Dispatches
  key: string
  itemIconDatum: ItemIconDatum
}

const PlannerItemIcon = ({
  dispatches,
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