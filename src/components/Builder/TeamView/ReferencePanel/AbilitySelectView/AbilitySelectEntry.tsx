import { MemberAbility } from "../../../../../types-queries/Member/MemberAbility";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
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
    <button
      className="ability-select__entry"
      onClick={e => clickHandlers.onAbilitySelect(e, ability)}
    >
      <div className="ability-select__name">
        {ability.formattedName}
      </div>
      <div className="ability-select__slot">
        {ENUMCASE_TO_TITLECASE(ability.slot)}
      </div>
    </button>
  );
};

export default AbilitySelectEntry;