import {
  Outlet,
} from "react-router-dom";

import {
  Cart,
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from "../../hooks/app-hooks";

import BuilderNavBar from './BuilderNavBar';
import {
  TierFilter,
} from "../../utils/smogonLogic";
import {
  GenerationNum,
} from "../../types-queries/helpers";

type BuilderProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const Builder = ({
  cart,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: BuilderProps) => {
  return (
    <div className="builder-container">
      <BuilderNavBar />
      <Outlet />
    </div>
  );
}
export default Builder;