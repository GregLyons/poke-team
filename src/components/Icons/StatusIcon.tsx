import { IconDatum } from "../../types-queries/helpers";
import { getStatusIcon } from "../../utils/sprites";

import './Icons.css';

type StatusIconProps = {
  statusIconDatum: IconDatum
}

const StatusIcon = ({
  statusIconDatum,
}: StatusIconProps) => {
  const {left, top} = getStatusIcon(statusIconDatum.name);

  return (
    <div
      className="status-icon"
      title={statusIconDatum.formattedName}
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