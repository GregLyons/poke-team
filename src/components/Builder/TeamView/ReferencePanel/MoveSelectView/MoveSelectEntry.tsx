import { toFormattedTypeName } from "../../../../../types-queries/helpers";
import { MemberMove } from "../../../../../types-queries/Member/MemberMove";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import TypeIcon from "../../../../Icons/TypeIcon";
import { MoveSelectHandlers } from "../../TeamView";

type MoveSelectEntryProps = {
  clickHandlers: MoveSelectHandlers
  move: MemberMove
};

const MoveSelectEntry = ({
  move,
  clickHandlers,
}: MoveSelectEntryProps) => {
  return (
    <button
      className={`
        move-select__entry
        ${move.eventOnly
          ? "move-select__entry.--event"
          : ''
        }
      `}
      title={move.eventOnly ? "Event-only" : ''}
      onClick={e => clickHandlers.onMoveSelect(e, move)}
    >
      <div className="move-select__name">
        {move.formattedName}
      </div>
      <div className="move-select__type">
        <TypeIcon
          typeIconDatum={{
            name: move.type,
            formattedName: toFormattedTypeName(move.type)
          }}
        />
      </div>
      <div className="move-select__power">
        {move.power}
      </div>
      <div className="move-select__pp">
        {move.pp}
      </div>
      <div className="move-select__accuracy">
        {move.accuracy === null
          ? '--'
          : move.accuracy
        }
      </div>
      <div className="move-select__category">
        {ENUMCASE_TO_TITLECASE(move.category)}
      </div>
    </button>
  );
};

export default MoveSelectEntry;