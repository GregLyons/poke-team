import { IconDatum } from "../../types-queries/helpers";
import { getStatIcon } from "../../utils/sprites";
import './Icons.css';


type StatIconProps = {
  iconDatum: IconDatum
}

const StatIcon = ({
  iconDatum,
}: StatIconProps) => {
  const {left, top} = getStatIcon(iconDatum.name);

  return (
    <div
      className="stat-icon icon"
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

export default StatIcon;