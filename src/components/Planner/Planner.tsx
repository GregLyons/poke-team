import {
  Outlet,
} from "react-router-dom";
import './Planner.css';

import {
  GenerationNum,
} from "../../types-queries/helpers";
import {
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from "../../hooks/app-hooks";

import PlannerNavBar from './PlannerNavBar';
import { TierFilter } from "../../utils/smogonLogic";

type PlannerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const Planner = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;