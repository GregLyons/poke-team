import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { Team, TeamAction } from "../../../hooks/App/Team";
import './PokemonTeam.css';
import TeamMember from "./TeamMember";


type PokemonTeamProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  team: Team
  genFilter: GenFilter
}

const PokemonTeam = ({
  team,
  dispatchTeam,
  genFilter,
}: PokemonTeamProps) => {
  return (
    <div
      className="team__wrapper"
    >
      {team[genFilter.gen].members.map((member, idx) => {
        return (
          <div 
            key={idx}
            className='team-icon__cell'
          >
            <TeamMember
              position={idx}
              member={member}
              dispatchTeam={dispatchTeam}
              team={team}
            />
          </div>
        )
      })}
    </div>
  );
};

export default PokemonTeam;