import { MemberItem } from "../../../../../types-queries/Builder/MemberItem";
import { toTypeName } from "../../../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import ItemIcon from "../../../Icons/ItemIcon";
import TypeIcon from "../../../Icons/TypeIcon";

type ItemSelectEntryProps = {
  item: MemberItem
};

const ItemSelectEntry = ({
  item,
}: ItemSelectEntryProps) => {
  return (
    <div
      className="item-select__entry"
    >
      <div className="item-select__icon">
        <ItemIcon
          itemIconDatum={{...item}}
        />
      </div>
      <div className="item-select__name">
        {item.formattedName}
      </div>
      <div className="item-select__description">
        Placeholder description.
      </div>
    </div>
  );
};

export default ItemSelectEntry;