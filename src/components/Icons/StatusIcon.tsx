import { IconDatum } from "../../types-queries/helpers";
import { getStatusIcon } from "../../utils/sprites";
import './Icons.css';


type StatusIconProps = {
  iconDatum: IconDatum
}

const StatusIcon = ({
  iconDatum,
}: StatusIconProps) => {
  const {left, top} = getStatusIcon(iconDatum.name);

  return (
    <div
      className="status-icon icon"
      title={iconDatum.formattedName}
      style={{
        width: '32px',
        height: '12px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}
    />
  )
}

export default StatusIcon;