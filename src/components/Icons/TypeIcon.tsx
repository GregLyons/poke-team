import { TypeIconDatum } from "../../types-queries/helpers";
import { getTypeIcon } from "../../utils/sprites";
import './Icons.css';


type TypeIconProps = {
  typeIconDatum: TypeIconDatum
}

const TypeIcon = ({
  typeIconDatum,
}: TypeIconProps) => {
  const { left, top, } = getTypeIcon(typeIconDatum.name);

  return (
    <div className="type-icon icon"
      title={typeIconDatum.formattedName}
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