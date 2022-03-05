import { IconDatum } from "../../types-queries/helpers";
import { getItemIcon } from "../../utils/sprites";

import './Icons.css';

type ItemIconProps = {
  itemIconDatum: IconDatum
}

const ItemIcon = ({
  itemIconDatum,
}: ItemIconProps) => {
  const {left, top} = getItemIcon(itemIconDatum);

  return (
    <div
      className="item-icon icon"
      title={itemIconDatum.formattedName}
      style={{
        width: '24px',
        height: '24px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}
    />
  )
}

export default ItemIcon;