import {
  Outlet,
} from "react-router-dom";

import {
  Cart,
  CartAction,
  TeamAction,
} from "../App";

import BuilderNavBar from './BuilderNavBar';
import {
  TierFilter,
} from "../../utils/constants";
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