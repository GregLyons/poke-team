import { MemberMove } from "../../../../../types-queries/Builder/MemberMove";
import { toTypeName } from "../../../../../types-queries/helpers";
import { ENUMCASE_TO_TITLECASE } from "../../../../../utils/constants";
import TypeIcon from "../../../Icons/TypeIcon";
import { MoveSelectClickHandlers } from "../../TeamView";

type MoveSelectEntryProps = {
  clickHandlers: MoveSelectClickHandlers
  move: MemberMove
};

const MoveSelectEntry = ({
  move,
  clickHandlers,
}: MoveSelectEntryProps) => {
  return (
    <div
      className="move-select__entry"
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