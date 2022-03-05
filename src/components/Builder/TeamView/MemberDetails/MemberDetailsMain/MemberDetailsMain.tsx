import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon"
import { GenNum, } from "../../../../../types-queries/helpers"
import ItemIcon from "../../../../Icons/ItemIcon"
import { MemberDetailsHandlers, ReferencePanelView } from "../../TeamView"
import MemberDetailBox from "../MemberDetailBox"
import MoveSlot from "./MoveSlot"

import './MemberDetailsMain.css';
import MemberDetailInnerBox from "../MemberDetailInnerBox"
import StatBox from "./StatBox/StatBox"

type MemberDetailsMainProps = {
  member: MemberPokemon
  handlers: MemberDetailsHandlers
  gen: GenNum
  view: ReferencePanelView
}

const MemberDetailsMain = ({
  member,
  handlers,
  gen,
  view,
}: MemberDetailsMainProps) => {
  return (
    <div
      className="member-details__main-wrapper"
    >
    {/* Ability */}
      <MemberDetailBox
        forClass="ability"
        header="Ability"
        content={<>{member?.ability?.formattedName}</>}

        active={view?.mode === 'ABILITY'}
        onContentClick={handlers.onAbilityClick}
        interactive={true}

        gen={gen}
        minGen={3}
      />

      {/* Item */}
      <MemberDetailBox
        forClass="item"
        header="Item"
        content={<>
          <div className="member-details__item-icon">
            {member?.item && <ItemIcon
              itemIconDatum={member.item}
            />}
          </div>
          <div className="member-details__item-name">
            {member?.item?.formattedName}
          </div>
        </>}

        active={view?.mode === 'ITEM'}
        onContentClick={handlers.onItemClick}
        interactive={true}

        gen={gen}
        minGen={2}
      />

      {/* Moveset */}
      <MemberDetailBox
        forClass="moveset"
        header="Moveset"
        content={<div
          className="member-details__moveset-wrapper"
        >
          {member.moveset.map((move, idx) => {
            const moveIdx = (idx as 0 | 1 | 2 | 3);

            // Type-guard
            if (moveIdx === undefined) return;
            return (
              <MemberDetailInnerBox
                key={`move_inner-box_${moveIdx}`}
                forClass="move"
                header={`Slot ${moveIdx + 1}`}
                content={<MoveSlot
                  view={view}
                  idx={moveIdx}
                  move={move}
                />}

                active={view?.mode === 'MOVE' && view.idx === moveIdx}
                onContentClick={e => handlers.onMoveClick(e, moveIdx)}
                interactive={true}
              />
            )
          })}
        </div>}

        active={view?.mode === 'MOVE'}
        hasInnerBox={true}
        interactive={true}
      />

      {/* Stats */}
      <MemberDetailBox
        forClass="stats"
        header="Stats"
        content={<StatBox
          member={member}
          handlers={handlers}
          gen={gen}
          view={view}
        />}

        active={view !== null && ['NATURE', 'EV', 'IV'].includes(view.mode)}
        hasInnerBox={true}
        interactive={true}
      />
    </div>
  );
};

export default MemberDetailsMain;