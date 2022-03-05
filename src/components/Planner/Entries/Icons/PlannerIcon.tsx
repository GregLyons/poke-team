import {
  getFieldStateIcon,
  getStatIcon,
  getStatusIcon,
  getTypeIcon, getUsageMethodIcon,
} from "../../../../utils/sprites";
import { LinkIconDatum } from "../../helpers";

import './Icons.css';

type PlannerIconProps = {
  key: string
  linkIconDatum: LinkIconDatum
}

const PlannerIcon = ({
  key,
  linkIconDatum
}: PlannerIconProps) => {
  const { iconClass, iconDatum } = linkIconDatum;
  let iconGetter;
  switch(iconClass) {
    case 'fieldState':
      iconGetter = getFieldStateIcon;
      break;
    case 'stat':
      iconGetter = getStatIcon;
      break;
    case 'status':
      iconGetter = getStatusIcon;
      break;
    case 'type':
      iconGetter = getTypeIcon;
      break;
    case 'usageMethod':
      iconGetter = getUsageMethodIcon;
      break;
    default:
      iconGetter = getTypeIcon;
  }

  const { left, top, } = iconGetter(iconDatum.name);
  
  return (
    <div className="planner__icon-container"
      style={{
        width: '100px',
        height: '22px',
        display: 'inline-block',
      }}
    >
      <div className="planner__icon-background" 
        style={{
          width: '100px',
          height: '22px',
        }}
      />
      <div
        className={`planner__${iconClass}-icon`}
        title={`${iconDatum.formattedName}`}
        key={key}
        style={{
          width: '32px',
          height: '12px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}
      />
    </div>
  );
};

export default PlannerIcon;