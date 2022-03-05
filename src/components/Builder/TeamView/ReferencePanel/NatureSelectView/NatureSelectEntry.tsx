import { toAbbreviatedBaseStatName } from "../../../../../types-queries/entities";
import { MemberNature } from "../../../../../types-queries/Member/MemberNature";
import { NatureSelectHandlers } from "../../TeamView";

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