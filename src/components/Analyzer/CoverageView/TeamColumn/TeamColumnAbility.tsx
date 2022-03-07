import { MemberAbility } from "../../../../types-queries/Member/MemberAbility";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import Popup from "../../../Reusables/Popup/Popup";

type TeamColumnAbilityProps = {
  member: MemberPokemon | null
  ability: MemberAbility | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnAbility = ({
  member,
  ability,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnAbilityProps) => {
  return (
    <Popup
      trigger={
        <div
          className={`
            analyzer-member__ability
            ${determineRelevance(ability?.psID)}
          `}
          onClick={onEntityClick(member?.psID || 'a', member?.ability?.psID || 'a')}
        >
          {ability?.formattedName || ''}
        </div>}
      content={<div>
        yo
      </div>}
      orientation='right'
      onClose={onEntityClose}
    />
  );
};

export default TeamColumnAbility;