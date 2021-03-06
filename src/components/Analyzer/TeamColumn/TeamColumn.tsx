import { useMemo } from "react";
import { Team, TeamAction } from "../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Filters } from "../../App";
import './TeamColumn.css';
import TeamColumnMember from "./TeamColumnMember";


type TeamColumnProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  team: Team
  mode: 'normal' | 'stat'
  teamFor: 'user' | 'enemy'

  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumn = ({
  teamDispatch,
  filters,

  team,
  mode,
  teamFor,

  relevantNames,
  onEntityClick,
  onPopupClose,
}: TeamColumnProps) => {
  const members = useMemo(() => {
    return team[filters.genFilter.gen].members;
  }, [filters, team, ]);

  return (
    <ol
      className="team-column__wrapper"
    >
      {members.map((member, idx) => <TeamColumnMember
          teamDispatch={teamDispatch}
          filters={filters}
          key={idx}
          member={member}
          memberIdx={idx}
          mode={mode}
          teamFor={teamFor}
          relevantNames={relevantNames}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      )}
    </ol>
  );
};

export default TeamColumn;