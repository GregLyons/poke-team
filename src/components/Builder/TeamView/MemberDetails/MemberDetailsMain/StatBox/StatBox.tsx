import { useMemo } from "react";
import { GenNum, ivsToHiddenPower, toAbbreviatedBaseStatName } from "../../../../../../types-queries/entities";
import { toFormattedTypeName, TypeName } from "../../../../../../types-queries/helpers";
import { DEFAULT_DV_SPREAD, DEFAULT_EV_SPREAD, DEFAULT_EV_SPREAD_GENS12, DEFAULT_IV_SPREAD } from "../../../../../../types-queries/Member/helpers";
import { MemberPokemon } from "../../../../../../types-queries/Member/MemberPokemon";
import TypeIcon from "../../../../../Icons/TypeIcon";
import { MemberDetailsHandlers, ReferencePanelView, TeamViewRefKey } from "../../../TeamView";
import MemberDetailInnerBox from "../../MemberDetailInnerBox";
import SpreadTable from "./SpreadTable";
import './StatBox.css';
import StatGraph from "./StatGraph";


type StatBoxProps = {
  nicknameRef: React.RefObject<HTMLDivElement>
  focusRef: React.RefObject<HTMLDivElement> | undefined
  refKey: TeamViewRefKey
  member: MemberPokemon | null
  handlers: MemberDetailsHandlers
  gen: GenNum
  view: ReferencePanelView
};

const StatBox = ({
  nicknameRef,
  focusRef,
  refKey,
  member,
  handlers,
  gen,
  view,
}: StatBoxProps) => {
  const hiddenPower: { type: TypeName, power: number, } = useMemo(() => {
    return ivsToHiddenPower(member?.ivs || (gen > 2 ? DEFAULT_IV_SPREAD : DEFAULT_DV_SPREAD), gen);
  }, [gen, member, ])
  return (<>
    {/* EVs */}
    <MemberDetailInnerBox
      focusRef={refKey === 'evs' ? focusRef : undefined}
      forClass="evs"
      header="EVs"
      title="Modify EVs."
      content={<SpreadTable
        statTable={member?.evs || (gen > 2 ? DEFAULT_EV_SPREAD : DEFAULT_EV_SPREAD_GENS12)}
        tableFor={'ev'}
      />}

      active={view?.mode === 'EV'}
      onContentClick={handlers.onEVsClick}
      interactive={true}

      gen={gen}
      minGen={3}
    />

    {/* IVs */}
    <MemberDetailInnerBox
      focusRef={refKey === 'ivs' ? focusRef : undefined}
      title="Modify IVs."
      forClass="ivs"
      header={gen < 3 ? 'DVs' : 'IVs'}
      content={<SpreadTable
        statTable={member?.ivs || (gen > 2 ? DEFAULT_IV_SPREAD : DEFAULT_DV_SPREAD)}
        tableFor={'iv'}
      />}

      active={view?.mode === 'IV'}
      onContentClick={handlers.onIVsClick}
      interactive={true}
    />

    {/* Hidden power */}
    <MemberDetailInnerBox
      focusRef={refKey === 'hp' ? focusRef : undefined}
      title="Select hidden-power type. Will change IVs for maximum possible power."
      forClass="hidden-power"
      header={'Hidden Power'}
      content={<div
        className="member-details__hidden-power-wrapper"
      >
        <div className="member-details__hidden-power-type">
          <TypeIcon
            typeIconDatum={{
              name: hiddenPower.type,
              formattedName: toFormattedTypeName(hiddenPower.type),
            }}
          />
        </div>
        <div className="member-details__hidden-power-value">
          {hiddenPower.power}
        </div>
      </div>}

      active={false}
      onContentClick={handlers.onHPClick}
      interactive={true}

      gen={gen}
      minGen={2}
      excludeGens={[8]}
    />
    
    {/* Nature */}
    <MemberDetailInnerBox
      focusRef={refKey === 'nature' ? focusRef : undefined}
      forClass="nature"
      header="Nature"
      title="Modify nature."
      content={<div
          className={`
            member-details__nature-wrapper
          `}
        >
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
      </div>}

      active={view?.mode === 'NATURE'}
      onContentClick={handlers.onNatureClick}
      interactive={true}

      gen={gen}
      minGen={3}
    />

    <MemberDetailInnerBox
      forClass="graph"
      title={`Graph of stats.`}
      header="Stat values"
      content={member !== null
        ? <StatGraph
            gen={gen}
            level={member?.level}
            baseStats={member?.baseStats}
            nature={member?.nature}
            evs={member?.evs}
            ivs={member?.ivs}
            isShedinja={member?.psID === 'shedinja'}
          />
        : <></>
      }
      
      interactive={false}
    />
  </>
  );
};

export default StatBox;