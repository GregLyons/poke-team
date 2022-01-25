import {
  useState,
} from "react";
import {
  ItemIconDatum,
  PokemonIconDatum,
} from "../../types-queries/helpers";
import {
  getItemIcon,
  getPokemonIcon,
} from "../../utils/sprites";
import {
  CartAction,
  TeamAction,
} from "../App";

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

  const [hover, setHover] = useState(false);

  return (
    <div className="planner__item-icon-container"
      style={{
        width: '24px',
        height: '24px',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="planner__item-icon-background" 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: hover
            ? 'lightblue' 
            : '',
        }}
      />
      <div
        className="planner__item-icon"
        title={`Icon for the Item ${itemIconDatum.formattedName}`}
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