import { MemberItem } from "../../../../../types-queries/Builder/MemberItem";
import { MemberNature as MemberNature } from "../../../../../types-queries/Builder/MemberNature";
import { toAbbreviatedBaseStatName, toTypeName } from "../../../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import ItemIcon from "../../../Icons/ItemIcon";
import TypeIcon from "../../../Icons/TypeIcon";
import { ItemSelectHandlers, NatureSelectHandlers } from "../../TeamView";

type NatureSelectEntryProps = {
  clickHandlers: NatureSelectHandlers
  nature: MemberNature
};

const NatureSelectEntry = ({
  nature,
  clickHandlers,
}: NatureSelectEntryProps) => {
  return (
    <div
      className="nature-select__entry"
      onClick={e => clickHandlers.onNatureSelect(e, nature)}
    >
      <div className="nature-select__name">
        {nature.formattedName}
      </div>
      <div className="nature-select__boost">
        {nature.modifiesStat.boosts ? `+${toAbbreviatedBaseStatName(nature.modifiesStat.boosts)}` : ''}
      </div>
      <div className="nature-select__reduce">
        {nature.modifiesStat.reduces ? `+${toAbbreviatedBaseStatName(nature.modifiesStat.reduces)}` : ''}
      </div>
    </div>
  );
};

export default NatureSelectEntry;