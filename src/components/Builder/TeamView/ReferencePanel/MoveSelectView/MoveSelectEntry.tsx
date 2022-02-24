import { MemberMove } from "../../../../../types-queries/Builder/MemberMove";
import { toTypeName } from "../../../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import TypeIcon from "../../../Icons/TypeIcon";
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
    <div
      className={`
        move-select__entry
        ${move.eventOnly
          ? "move-select__entry--event"
          : ''
        }
      `}
      title={move.eventOnly ? "Event-only" : ''}
      onClick={e => clickHandlers.onMoveSelect(e, move)}
    >
      <div className="move-select__name">
        {move.formattedName}
      </div>
      <div className="move-select__data">
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
        <div className="move-select__type">
          <TypeIcon
            typeName={move.type}
          />
        </div>
      </div>
      <div className="move-select__description">
        Placeholder description.
      </div>
    </div>
  );
};

export default MoveSelectEntry;