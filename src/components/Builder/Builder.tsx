import {
  Outlet,
} from "react-router-dom";

import {
  Cart,
  CartAction,
  GenFilter,
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
}

const Builder = ({
  cart,
  dispatchCart,
  dispatchTeam,
  genFilter,
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