import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import TypeIcon from "../../Icons/TypeIcon";
import { MemberDetailHandlers, MoveSelectClickHandlers, ReferencePanelView } from "../TeamView";

type MoveSlotProps = {
  view: ReferencePanelView
  idx: 0 | 1 | 2 | 3
  clickHandlers: MemberDetailHandlers
  member: MemberPokemon | null
}

const MoveSlot = ({
  view,
  idx,
  clickHandlers,
  member,
}: MoveSlotProps) => {
  return (
    <div className={`
        member-details__move-wrapper
        ${view && view.mode === 'MOVE' && view.idx === idx
          ? 'member-details__move-wrapper--active'
          : ''
        }
      `}
      title={member?.moveset[idx]?.eventOnly ? 'Event-only' : ''}
      onClick={e => clickHandlers.onMoveClick(e, idx)}
    >
      <div className="member-details__move-header">
        {view && view.mode === 'MOVE' && view.idx === idx
          ? 'Active'
          : 'Slot ' + (idx + 1)
        }
      </div>
      <div className="member-details__move-type">
        {member?.moveset[idx]?.type && <TypeIcon
          typeName={member?.moveset[idx]?.type || 'normal'}
        />}
      </div>
      <div className="member-details__move-name">
        {member?.moveset[idx]?.formattedName || ''}
        {member?.moveset[idx]?.eventOnly && <>
          &nbsp;<span className="member-details__move-event">
            E
          </span>
        </>}
      </div>
    </div>
  )
};

export default MoveSlot;