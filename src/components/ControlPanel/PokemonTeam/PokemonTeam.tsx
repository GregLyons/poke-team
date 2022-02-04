import { useEffect, useRef } from "react";
import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { Team, TeamAction } from "../../../hooks/App/Team";

import './PokemonTeam.css';
import PokemonTeamMember from "./PokemonTeamMember";

type PokemonTeamProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  team: Team
}

const PokemonTeam = ({
}: PokemonTeamProps) => {
  return (
    <div
      className="team__wrapper"
    >
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
      <div className="team-member__cell">
        <PokemonTeamMember

        />
      </div>
    </div>
  );
};

export default PokemonTeam;