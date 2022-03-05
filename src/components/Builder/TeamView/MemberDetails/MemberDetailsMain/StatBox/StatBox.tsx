import TypeIcon from "../../../../../Icons/TypeIcon";
import { MemberDetailsHandlers, ReferencePanelView } from "../../../TeamView";
import MemberDetailInnerBox from "../../MemberDetailInnerBox";
import SpreadTable from "./SpreadTable";
import StatGraph from "./StatGraph";

import './StatBox.css';
import { MemberPokemon } from "../../../../../../types-queries/Member/MemberPokemon";
import { GenNum, ivsToHiddenPower, toAbbreviatedBaseStatName } from "../../../../../../types-queries/entities";
import { DEFAULT_DV_SPREAD, DEFAULT_EV_SPREAD, DEFAULT_EV_SPREAD_GENS12, DEFAULT_IV_SPREAD } from "../../../../../../types-queries/Member/helpers";

type StatBoxProps = {
  member: MemberPokemon | null
  handlers: MemberDetailsHandlers
  gen: GenNum
  view: ReferencePanelView
};

const StatBox = ({
  member,
  handlers,
  gen,
  view,
}: StatBoxProps) => {
  return (<>
    {/* Nature */}
    <MemberDetailInnerBox
      forClass="nature"
      header="Nature"
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

    {/* EVs */}
    <MemberDetailInnerBox
      forClass="evs"
      header="EVs"
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
      forClass="hidden-power"
      header={'Hidden Power'}
      content={<div
        className="member-details__hidden-power-wrapper"
      >
        <div className="member-details__hidden-power-type">
          <TypeIcon
            typeName={ivsToHiddenPower(member?.ivs || (gen > 2 ? DEFAULT_IV_SPREAD : DEFAULT_DV_SPREAD), gen).type}
          />
        </div>
        <div className="member-details__hidden-power-value">
          {ivsToHiddenPower(member?.ivs || (gen > 2 ? DEFAULT_IV_SPREAD : DEFAULT_DV_SPREAD), gen).power}
        </div>
      </div>}

      active={false}
      onContentClick={() => {}}
      interactive={true}

      gen={gen}
      minGen={2}
      excludeGens={[8]}
    />

    <MemberDetailInnerBox
      forClass="graph"
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