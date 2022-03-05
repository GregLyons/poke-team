import { toFormattedTypeName } from "../../../../../types-queries/helpers";
import { MemberMove } from "../../../../../types-queries/Member/MemberMove";
import TypeIcon from "../../../../Icons/TypeIcon";

type MoveSlotProps = {
  move: MemberMove | null
}

const MoveSlot = ({
  move,
}: MoveSlotProps) => {
  return (
    <div
      className="member-details__move-wrapper"
    >
      <div className="member-details__move-type">
        {move?.type && <TypeIcon
          typeIconDatum={{
            name: move?.type || 'normal',
            formattedName: toFormattedTypeName(move?.type || 'normal'),
          }}
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