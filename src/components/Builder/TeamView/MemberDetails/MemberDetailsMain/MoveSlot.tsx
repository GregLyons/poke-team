import { MemberMove } from "../../../../../types-queries/Builder/MemberMove";
import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon";
import TypeIcon from "../../../../Icons/TypeIcon";
import { MemberDetailsHandlers, MoveSelectHandlers, ReferencePanelView } from "../../TeamView";

type MoveSlotProps = {
  view: ReferencePanelView
  idx: 0 | 1 | 2 | 3
  move: MemberMove | null
}

const MoveSlot = ({
  view,
  idx,
  move,
}: MoveSlotProps) => {
  return (
    <div
      className="member-details__move-wrapper"
    >
      <div className="member-details__move-type">
        {move?.type && <TypeIcon
          typeName={move?.type || 'normal'}
        />}
      </div>
      <div className="member-details__move-name">
        {move?.formattedName || ''}
        {move?.eventOnly && <>
          &nbsp;<span className="member-details__move-event">
            E
          </span>
        </>}
      </div>
    </div>
  )
};

export default MoveSlot;