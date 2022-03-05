import { IconDatum } from "../../types-queries/helpers";
import { getFieldStateIcon } from "../../utils/sprites";

import './Icons.css';

type FieldStateIconProps = {
  iconDatum: IconDatum
}

const FieldStateIcon = ({
  iconDatum,
}: FieldStateIconProps) => {
  const {left, top} = getFieldStateIcon(iconDatum.name);

  return (
    <div
      className="field-state-icon icon"
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

export default FieldStateIcon;