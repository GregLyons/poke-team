import { MemberMove } from "../../../../types-queries/Member/MemberMove";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import Popup from "../../../Reusables/Popup/Popup";

type TeamColumnMoveProps = {
  member: MemberPokemon | null
  move: MemberMove | null | undefined
  moveIdx: 0 | 1 | 2 | 3
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnMove = ({
  member,
  move,
  moveIdx,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnMoveProps) => {
  return (
    <Popup
      trigger={<div
        className={`
          analyzer-member__move${moveIdx + 1}_${member?.psID}
          ${determineRelevance(move?.psID)}
        `}
        onClick={onEntityClick(member?.psID || 'a', member?.moveset[moveIdx]?.psID || 'a')}
      >
        {move?.formattedName || ''}
      </div>}
      content={<div>
        yo
      </div>}
      orientation='right'
      onClose={onEntityClose}
    />
    
  );
};

export default TeamColumnMove;