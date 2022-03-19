import { GenNum } from "../../../../../types-queries/entities";
import { MoveSlot } from "../../../../../types-queries/Member/helpers";
import { MemberPokemon } from "../../../../../types-queries/Member/MemberPokemon";
import ItemIcon from "../../../../Icons/ItemIcon";
import { MemberDetailsHandlers, ReferencePanelView } from "../../TeamView";
import MemberDetailBox from "../MemberDetailBox";
import MemberDetailInnerBox from "../MemberDetailInnerBox";
import './MemberDetailsMain.css';
import MemberDetailsMoveSlot from "./MoveSlot";
import StatBox from "./StatBox/StatBox";


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
        title="Select ability."
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
        title="Select item."
        content={<>
          <div className="member-details__item-icon">
            {member?.item && <ItemIcon
              itemIconDatum={{
                name: member.item.psID,
                formattedName: member.item.formattedName,
              }}
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
        title="Modify moveset."
        content={<div
          className="member-details__moveset-wrapper"
        >
          {member.moveset.map((move, idx) => {
            const moveIdx = (idx as MoveSlot);

            // Type-guard
            if (moveIdx === undefined) return;
            return (
              <MemberDetailInnerBox
                key={moveIdx}
                title={`Select move ${moveIdx + 1}`}
                forClass="move"
                header={`Slot ${moveIdx + 1}`}
                content={<MemberDetailsMoveSlot
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
        title="Modify stats"
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