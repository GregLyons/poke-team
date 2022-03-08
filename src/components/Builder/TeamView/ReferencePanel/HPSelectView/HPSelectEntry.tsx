import { BaseStatName, toAbbreviatedBaseStatName } from "../../../../../types-queries/entities";
import { toFormattedTypeName, TypeName } from "../../../../../types-queries/helpers";
import { hiddenPowerToMaxIVs } from "../../../../../types-queries/Member/helpers";
import TypeIcon from "../../../../Icons/TypeIcon";
import { HPSelectHandlers } from "../../TeamView";

type HPSelectEntryProps = {
  clickHandlers: HPSelectHandlers
  typeName: TypeName
  defaultIV: number
};

const HPSelectEntry = ({
  clickHandlers,
  typeName,
  defaultIV,
}: HPSelectEntryProps) => {
  return (
    <div
      className="hp-select__entry"
      onClick={e => clickHandlers.onHPSelect(e, typeName)}
    >
      <div className="hp-select__icon">
        <TypeIcon
          typeIconDatum={{
            name: typeName,
            formattedName: toFormattedTypeName(typeName),
          }}
        />
      </div>
      <div className="hp-select__name">
        {toFormattedTypeName(typeName)}
      </div>
      <div className="hp-select__ivs">
        {Object.entries(hiddenPowerToMaxIVs(typeName))
          .filter(([_, iv]) => iv !== defaultIV)
          .map(([baseStatName, _]) => {
            return '30 ' + toAbbreviatedBaseStatName(baseStatName as BaseStatName);
          }).join(' / ')
        }
      </div>
    </div>
  );
};

export default HPSelectEntry;