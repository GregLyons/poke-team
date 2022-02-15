import { TypeName } from "../../../types-queries/helpers";
import { getTypeIcon } from "../../../utils/sprites";

import './Icons.css';

type TypeIconProps = {
  typeName: TypeName
}

const TypeIcon = ({
  typeName
}: TypeIconProps) => {
  const { left, top, } = getTypeIcon(typeName);

  return (
    <div className="type-icon"
      style={{
        width: '32px',
        height: '12px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}
    />
  )
}

export default TypeIcon;