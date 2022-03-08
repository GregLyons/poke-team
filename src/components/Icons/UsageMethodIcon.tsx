import { IconDatum } from "../../types-queries/helpers";
import { getUsageMethodIcon } from "../../utils/sprites";
import './Icons.css';


type UsageMethodIconProps = {
  iconDatum: IconDatum
}

const UsageMethodIcon = ({
  iconDatum,
}: UsageMethodIconProps) => {
  const {left, top} = getUsageMethodIcon(iconDatum.name);

  return (
    <div
      className="usage-method-icon icon"
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

export default UsageMethodIcon;