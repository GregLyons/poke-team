import { TeamAction } from "../../../hooks/App/Team";
import { StatTable } from "../../../types-queries/entities";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";

type TeamColumnSpreadProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon | null
  memberIdx: number
  
  evs: StatTable
  ivs: StatTable
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnSpread = ({

}: TeamColumnSpreadProps) => {
  return (
    <div>
      yo
    </div>
  );
};

export default TeamColumnSpread;