import { MemberItem } from "../../../../types-queries/Member/MemberItem";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import Popup from "../../../Reusables/Popup/Popup";

type TeamColumnItemProps = {
  member: MemberPokemon | null
  item: MemberItem | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnItem = ({
  member,
  item,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnItemProps) => {
  return (
    <Popup
      trigger={
        <div
          className={`
            analyzer-member__item
            ${determineRelevance(item?.psID)}
          `}
          onClick={onEntityClick(member?.psID || 'a', member?.item?.psID || 'a')}
        >
          {item?.formattedName || ''}
        </div>}
      content={<div>
        yo
      </div>}
      orientation='right'
      onClose={onEntityClose}
    />
  );
};

export default TeamColumnItem;