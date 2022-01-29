import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { Team, TeamAction } from "../../../hooks/App/Team";

type TeamDisplayProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  team: Team
}

const TeamDisplay = ({
}: TeamDisplayProps) => {
  return (
    <div className="control-panel__team-wrapper">
      Team
    </div>
  );
};

export default TeamDisplay;