import { GenFilter } from "../../../hooks/App/GenFilter";
import { Team } from "../../../hooks/App/Team";
import PokemonIcon from "../../Icons/PokemonIcon";
import './TeamDisplay.css';


type TeamDisplayProps = {
  team: Team
  genFilter: GenFilter
}

const TeamDisplay = ({
  team,
  genFilter,
}: TeamDisplayProps) => {
  return (
    <div
      className="team-display__wrapper"
    >
      {team[genFilter.gen].members.map((member, idx) => {
        return (
          <div 
            key={idx}
            className={`
              team-display__icon
              ${member
                ? '--occupied'
                : ''
              }
            `}
          >
            {member && <PokemonIcon
              pokemonIconDatum={member.iconDatum}
              gender={member.gender}
            />}
          </div>
        )
      })}
    </div>
  );
};

export default TeamDisplay;