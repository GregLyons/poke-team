import { MemberAbility } from "../../../../../types-queries/Member/MemberAbility";
import { toTypeName } from "../../../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import TypeIcon from "../../../../Icons/TypeIcon";
import { AbilitySelectHandlers } from "../../TeamView";

type AbilitySelectEntryProps = {
  clickHandlers: AbilitySelectHandlers
  ability: MemberAbility
};

const AbilitySelectEntry = ({
  ability,
  clickHandlers,
}: AbilitySelectEntryProps) => {
  return (
    <div
      className="ability-select__entry"
      onClick={e => clickHandlers.onAbilitySelect(e, ability)}
    >
      <div className="ability-select__name">
        {ability.formattedName}
      </div>
      <div className="ability-select__slot">
        {ENUMCASE_TO_TITLECASE(ability.slot)}
      </div>
      <div className="ability-select__description">
        Placeholder description.
      </div>
    </div>
  );
};

export default AbilitySelectEntry;