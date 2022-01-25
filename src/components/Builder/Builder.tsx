import {
  Outlet,
} from "react-router-dom";

import {
  Cart,
  CartAction,
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
  gen: GenerationNum
  tierFilter: TierFilter
}

const Builder = ({
  cart,
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: BuilderProps) => {
  return (
    <div className="builder-container">
      <BuilderNavBar />
      <Outlet />
    </div>
  );
}
export default Builder;