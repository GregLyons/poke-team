import { useState } from "react";
import { TeamAction } from "../../../../hooks/App/Team";
import { BaseStatName } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import TeamColumnStatsPopup from "./TeamColumnStatsPopup";
import TeamColumnStatsTrigger from "./TeamColumnStatsTrigger";

type TeamColumnStatsProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number

  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnStats = ({
  teamDispatch,
  filters,

  member,
  memberIdx,

  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnStatsProps) => {
  const [forceClose, setForceClose] = useState<boolean>(false);

  const updateEV = (statName: BaseStatName) => {
    return (newValue: number) => {
      teamDispatch({
        type: 'assign_ev',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          stat: statName,
          newValue,
        }
      });
    }
  } 

  const updateIV = (statName: BaseStatName) => {
    return (newValue: number) => {
      teamDispatch({
        type: 'assign_iv',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          stat: statName,
          newValue,
        }
      });
    }
  }

  return (
    <Popup
      trigger={<TeamColumnStatsTrigger
        member={member}
        determineRelevance={determineRelevance}
      />}
      content={<TeamColumnStatsPopup
        updateEV={updateEV}
        evs={member.evs}
        updateIV={updateIV}
        ivs={member.ivs}
        gen={filters.genFilter.gen}
      />}
      orientation='bottom'

      onClose={onPopupClose}
      forceClose={forceClose}
    />
  );
};

export default TeamColumnStats;