import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon"
import { GenerationNum, ivsToHiddenPower, toAbbreviatedBaseStatName } from "../../../../../types-queries/helpers"
import ItemIcon from "../../../../Icons/ItemIcon"
import TypeIcon from "../../../../Icons/TypeIcon"
import { MemberDetailsHandlers, ReferencePanelView } from "../../TeamView"
import MemberDetailBox from "../MemberDetailBox"
import MoveSlot from "./MoveSlot"
import SpreadTable from "./SpreadTable"
import StatGraph from "./StatGraph"

import './MemberDetailsMain.css';

type MemberDetailsMainProps = {
  member: MemberPokemon
  handlers: MemberDetailsHandlers
  gen: GenerationNum
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
          <MoveSlot
            view={view}
            idx={0}
            clickHandlers={handlers}
            member={member}
          />
          <MoveSlot
            view={view}
            idx={1}
            clickHandlers={handlers}
            member={member}
          />
          <MoveSlot
            view={view}
            idx={2}
            clickHandlers={handlers}
            member={member}
          />
          <MoveSlot
            view={view}
            idx={3}
            clickHandlers={handlers}
            member={member}
          />
        </div>}

        active={view?.mode === 'MOVE'}
      />

      {/* Stats */}
      <MemberDetailBox
        forClass="stats"
        header="Stats"
        content={<>
          <div
            className={`
              member-details__stat-wrapper
              member-details__nature-wrapper
              ${view && view.mode === 'NATURE'
                ? 'member-details__stat-wrapper--active'
                : ''
              }
              ${gen < 3
                ? 'member-details__content--disabled'
                : ''
              }
            `}
            onClick={handlers.onNatureClick}
          >
            <div className="member-details__stat-header">
              {gen > 2 ? 'Nature' : ''}
            </div>
            <div className="member-details__nature-name">
              {member?.nature?.formattedName}
            </div>
            <div className="member-details__nature-boosts">
              {member?.nature?.modifiesStat?.boosts
                ? '+' + toAbbreviatedBaseStatName(member.nature.modifiesStat.boosts)
                : ''
              }
            </div>
            <div className="member-details__nature-reduces">
              {member?.nature?.modifiesStat?.reduces
                ? '-' + toAbbreviatedBaseStatName(member.nature.modifiesStat.reduces)
                : ''
              }
            </div>
          </div>
          <div
            className={`
              member-details__stat-wrapper
              member-details__evs-wrapper
              ${view && view.mode === 'EV'
                ? 'member-details__stat-wrapper--active'
                : ''
              }
              ${gen < 3
                ? 'member-details__content--disabled'
                : ''
              }
            `}
            onClick={handlers.onEVsClick}
          >
            <div className="member-details__stat-header">
              EVs
            </div>
            <SpreadTable
              statTable={member.evs}
              tableFor={'ev'}
            />
          </div>
          <div
            className={`
              member-details__stat-wrapper
              member-details__ivs-wrapper
              ${view && view.mode === 'IV'
                ? 'member-details__stat-wrapper--active'
                : ''
              }
            `}
            onClick={handlers.onIVsClick}
          >
            <div className="member-details__stat-header">
              {gen < 3 ? 'DVs' : 'IVs'}
            </div>
            <SpreadTable
              statTable={member.ivs}
              tableFor={'iv'}
            />
          </div>
          <div
            // Not interactive, so we don't give it .member-detials__stat-wrapper class
            className={`
              member-details__hidden-power-wrapper
              ${[1, 8].includes(gen)
                ? 'member-details__content--disabled'
                : ''
              }
            `}
          >
            <div className="member-details__stat-header">
              {![1, 8].includes(gen) ? 'Hidden Power' : ''}
            </div>
              {![1, 8].includes(gen) && <>
                <div className="member-details__hidden-power-type">
                  <TypeIcon
                    typeName={ivsToHiddenPower(member.ivs, gen).type}
                  />
                </div>
                <div className="member-details__hidden-power-value">
                  {ivsToHiddenPower(member.ivs, gen).power}
                </div>
              </>}
          </div>
          <div
            className={`
              member-details__graph-wrapper
            `}
          >
              <div className="member-details__stat-header">
                Stat values
              </div>
            <StatGraph
              gen={gen}
              level={member.level}
              baseStats={member.baseStats}
              nature={member.nature}
              evs={member.evs}
              ivs={member.ivs}
              isShedinja={member.name === 'shedinja'}
            />
          </div>
        </>}

        active={view !== null && ['NATURE', 'EV', 'IV'].includes(view.mode)}
      />
    </div>
  );
};

export default MemberDetailsMain;