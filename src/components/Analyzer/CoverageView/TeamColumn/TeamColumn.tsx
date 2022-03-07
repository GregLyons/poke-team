import { useMemo } from "react";
import { Team } from "../../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { Filters } from "../../../App";
import TeamColumnMember from "./TeamColumnMember";

import './TeamColumn.css';

type TeamColumnProps = {
  filters: Filters
  team: Team
  relevantNames: MemberPSIDObject | null
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumn = ({
  filters,
  team,
  relevantNames,
  onEntityClick,
  onEntityClose,
}: TeamColumnProps) => {
  const members = useMemo(() => {
    return team[filters.genFilter.gen].members;
  }, [filters, team, ]);

  return (
    <div
      className="team-column__wrapper"
    >
      {members.map((member, idx) => <TeamColumnMember
          key={`analyzer_member_${idx}`}
          member={member}
          relevantNames={relevantNames}
          onEntityClick={onEntityClick}
          onEntityClose={onEntityClose}
        />
      )}
    </div>
  );
};

export default TeamColumn;