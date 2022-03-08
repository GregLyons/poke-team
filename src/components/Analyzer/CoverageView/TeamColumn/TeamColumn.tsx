import { useMemo } from "react";
import { Team } from "../../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { Dispatches, Filters } from "../../../App";
import './TeamColumn.css';
import TeamColumnMember from "./TeamColumnMember";


type TeamColumnProps = {
  dispatches: Dispatches
  filters: Filters

  team: Team
  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumn = ({
  dispatches,
  filters,

  team,
  relevantNames,
  onEntityClick,
  onPopupClose,
}: TeamColumnProps) => {
  const members = useMemo(() => {
    return team[filters.genFilter.gen].members;
  }, [filters, team, ]);

  return (
    <div
      className="team-column__wrapper"
    >
      {members.map((member, idx) => <TeamColumnMember
          dispatches={dispatches}
          filters={filters}
          key={`analyzer_member_${idx}`}
          member={member}
          memberIdx={idx}
          relevantNames={relevantNames}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      )}
    </div>
  );
};

export default TeamColumn;