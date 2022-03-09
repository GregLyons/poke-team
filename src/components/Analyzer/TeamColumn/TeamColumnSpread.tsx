import { TeamAction } from "../../../hooks/App/Team";
import { StatTable } from "../../../types-queries/entities";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";

type TeamColumnSpreadProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon | null
  memberIdx: number
  
  statTable: StatTable
  spreadMode: 'ev' | 'iv'

  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnSpread = ({
  teamDispatch,
  filters,

  member,
  memberIdx,

  statTable,
  spreadMode,

  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnSpreadProps) => {
  const gen = filters.genFilter.gen;
  return (
    <div>
      {spreadMode === 'ev'
        ? 'EVs'
        : gen > 2
          ? 'IVs'
          : 'DVs'
      }
    </div>
  );
};

export default TeamColumnSpread;