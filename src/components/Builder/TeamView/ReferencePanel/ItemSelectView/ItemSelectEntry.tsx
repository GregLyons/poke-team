import { MemberItem } from "../../../../../types-queries/Member/MemberItem";
import ItemIcon from "../../../../Icons/ItemIcon";
import { ItemSelectHandlers } from "../../TeamView";

type ItemSelectEntryProps = {
  clickHandlers: ItemSelectHandlers
  item: MemberItem
};

const ItemSelectEntry = ({
  item,
  clickHandlers,
}: ItemSelectEntryProps) => {
  return (
    <div
      className="item-select__entry"
      onClick={e => clickHandlers.onItemSelect(e, item)}
    >
      <div className="item-select__icon">
        <ItemIcon
          itemIconDatum={{
            name: item.psID,
            formattedName: item.formattedName,
          }}
        />
      </div>
      <div className="item-select__name">
        {item.formattedName}
      </div>
    </div>
  );
};

export default ItemSelectEntry;