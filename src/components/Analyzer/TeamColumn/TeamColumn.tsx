import { useMemo } from "react";
import { Team } from "../../../hooks/App/Team";
import { MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Filters } from "../../App";
import AnalyzerMember from "./AnalyzerMember";

import './TeamColumn.css';

type TeamColumnProps = {
  filters: Filters
  team: Team
  relevantNames: MemberPSIDObject | null
};

const TeamColumn = ({
  filters,
  team,
  relevantNames,
}: TeamColumnProps) => {
  const members = useMemo(() => {
    return team[filters.genFilter.gen].members;
  }, [filters, team, ]);

  return (
    <div
      className="team-column__wrapper"
    >
      {members.map((member, idx) => <AnalyzerMember
          key={`analyzer_member_${idx}`}
          member={member}
          relevantNames={relevantNames}
        />
      )}
    </div>
  );
};

export default TeamColumn;