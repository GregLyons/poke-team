import { useCallback, useMemo } from "react";
import { TeamAction } from "../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { toFormattedTypeName } from "../../../types-queries/helpers";
import { MoveSlot } from "../../../types-queries/Member/helpers";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import ItemIcon from "../../Icons/ItemIcon";
import PokemonIcon from "../../Icons/PokemonIcon";
import TypeIcon from "../../Icons/TypeIcon";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import TeamColumnAbility from "./TeamColumnAbility";
import TeamColumnItem from "./TeamColumnItem";
import TeamColumnMove from "./TeamColumnMove";
import TeamColumnNature from "./TeamColumnNature";

type TeamColumnMemberProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon | null
  memberIdx: number
  mode: 'normal' | 'stat'
  teamFor: 'user' | 'enemy'

  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnMember = ({
  teamDispatch,
  filters,

  member,
  memberIdx,
  mode,
  teamFor,

  relevantNames,
  onEntityClick,
  onPopupClose,
}: TeamColumnMemberProps) => {
  // Highlights/de-highlights ability names, move names, etc. which are relevant to the element being hovered over (e.g. a cell in the type coverage chart)
  const determineRelevance = useCallback((name: string | undefined) => {
    if (member === null || relevantNames === null) return '';
    else if (name && relevantNames[member?.psID] && relevantNames[member?.psID].includes(name)) return '--relevant';
    else if (name && Object.keys(relevantNames).includes(name)) return '--relevant';
    else return '--irrelevant';
  }, [relevantNames, member, ]);

  const popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  } = useMemo(() => {
    const orientation = teamFor === 'user' ? 'right' : 'left';
    const nudge = memberIdx < 3 ? 'bottom' : 'top';
    return { orientation, nudge, };
  }, [memberIdx, teamFor, ]);

  return (
    <li
      className={`
        team-column__member-wrapper
        ${determineRelevance(member?.psID)}
        --${teamFor}
      `}
    >
      <ErrorBoundary>
        <div
          className={`
            team-column__icon
            ${determineRelevance(member?.psID)}
          `}
        >
          {member 
            ?<PokemonIcon
              pokemonIconDatum={member?.iconDatum}
              gender={member?.gender}
            /> 
            : ''}
        </div>
        <div
          className={`
            team-column__item-icon
            ${determineRelevance(member?.item?.psID)}
          `}
        >
          {member?.item && <ItemIcon
            itemIconDatum={{ name: member.item.psID, formattedName: member.item.formattedName}}
          />}
        </div>
        <div
          className={`
            team-column__name
            ${determineRelevance(member?.psID)}
            team-column__text
          `}
        >
          {member?.formattedName}
        </div>
        <div
          className={`
            team-column__typing
            ${determineRelevance(member?.psID)}
          `}
        >
          {member && member.typing.map(typeName => <TypeIcon
            key={typeName}
            typeIconDatum={{
              name: typeName,
              formattedName: toFormattedTypeName(typeName)
            }}
          />)}
        </div>
        {mode === 'normal' && member && <>
          <div className="team-column__ability">
            <TeamColumnAbility
              teamDispatch={teamDispatch}
              filters={filters}

              member={member}
              memberIdx={memberIdx}
              popupPositioning={popupPositioning}

              ability={member?.ability}
              determineRelevance={determineRelevance}
              onEntityClick={onEntityClick}
              onPopupClose={onPopupClose}
            />
          </div>
          <div className="team-column__item">
            <TeamColumnItem
              teamDispatch={teamDispatch}
              filters={filters}

              member={member}
              memberIdx={memberIdx}
              popupPositioning={popupPositioning}

              item={member?.item}
              determineRelevance={determineRelevance}
              onEntityClick={onEntityClick}
              onPopupClose={onPopupClose}
            />
          </div>
          {([0, 1, 2, 3] as (MoveSlot)[]).map(idx => (<div
            className={`
              team-column__move${idx + 1}
            `}
          >
            <TeamColumnMove
              key={idx}

              teamDispatch={teamDispatch}
              filters={filters}

              member={member}
              memberIdx={memberIdx}
              popupPositioning={popupPositioning}

              move={member?.moveset[idx]}
              moveIdx={idx}
              determineRelevance={determineRelevance}
              onEntityClick={onEntityClick}
              onPopupClose={onPopupClose}
            />
          </div>))}
        </>}
        {mode === 'stat' && <>
          <div className="team-column__nature">
            {member && <TeamColumnNature
              teamDispatch={teamDispatch}
              filters={filters}

              member={member}
              memberIdx={memberIdx}
              popupPositioning={popupPositioning}

              nature={member?.nature}
              determineRelevance={determineRelevance}
              onEntityClick={onEntityClick}
              onPopupClose={onPopupClose}
            />}
          </div>
          <div className="team-column__stats">
            {member && <>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('HP')}
                `}
              >
                <span className="team-column__text">
                  HP&nbsp; {member.computeHP()}
                </span>
              </div>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('Def')}
                `}
              >
                <span className="team-column__text">
                  Def {member.computeDefense()}
                </span>
              </div>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('SpD')}
                `}
              >
                <span className="team-column__text">
                  SpD {member.computeSpecialDefense()}
                </span>
              </div>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('Atk')}
                `}
              >
                <span className="team-column__text">
                  Atk {member.computeAttack()}
                </span>
              </div>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('SpA')}
                `}
              >
                <span className="team-column__text">
                  SpA {member.computeSpecialAttack()}
                </span>
              </div>
              <div
                className={`
                  team-column__stat-wrapper
                  ${determineRelevance('Spe')}
                `}
              >
                <span className="team-column__text">
                  Spe {member.computeSpeed()}
                </span>
              </div>
            </>}
          </div>
        </>}
      </ErrorBoundary>
    </li>
  )
};

export default TeamColumnMember;