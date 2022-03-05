import { toFormattedTypeName, TypeName } from "../../../../types-queries/helpers";
import FieldStateIcon from "../../../Icons/FieldStateIcon";
import ItemIcon from "../../../Icons/ItemIcon";
import StatIcon from "../../../Icons/StatIcon";
import StatusIcon from "../../../Icons/StatusIcon";
import TypeIcon from "../../../Icons/TypeIcon";
import UsageMethodIcon from "../../../Icons/UsageMethodIcon";
import { LinkIconDatum } from "../../helpers";

import './Icons.css';

type PlannerIconProps = {
  linkIconDatum: LinkIconDatum
}

const PlannerIcon = ({
  linkIconDatum
}: PlannerIconProps) => {
  const { iconClass, iconDatum } = linkIconDatum;

  let iconComponent: JSX.Element;
  switch(iconClass) {
    case 'fieldState':
      iconComponent = <FieldStateIcon
        iconDatum={iconDatum}
      />;
      break;
    case 'item':
      iconComponent = <ItemIcon
        itemIconDatum={iconDatum}
      />;
      break;
    case 'stat':
      iconComponent = <StatIcon
        iconDatum={iconDatum}
      />;
      break;
    case 'status':
      iconComponent = <StatusIcon
        iconDatum={iconDatum}
      />;
      break;
    case 'type':
      iconComponent = <TypeIcon
        typeIconDatum={{
          name: (iconDatum.name as TypeName) || 'normal',
          formattedName: toFormattedTypeName((iconDatum.name as TypeName) || 'normal'),
        }}
      />;
      break;
    case 'usageMethod':
      iconComponent = <UsageMethodIcon
        iconDatum={iconDatum}
      />;
      break;
  }

  return (
    <div className="planner__icon-container"
      style={{
        width: iconClass === 'item'
          ? '24px'
          : '32px',
        height: iconClass === 'item'
          ? '24px'
          : '12px',
        display: 'inline-block',
      }}
    >
      {iconComponent}
    </div>
  );
};

export default PlannerIcon;