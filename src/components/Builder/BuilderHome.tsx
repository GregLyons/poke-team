import {
  GenerationNum,
} from '../../types-queries/helpers';
import {
  TierFilter,
} from '../../utils/smogonLogic';

import {
  Cart,
  CartAction,
  GenFilter,
  TeamAction,
} from '../../hooks/app-hooks';

import CartView from './CartView/CartView';
import PokemonSearch from './PokemonSearch';

type BuilderHomeProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const BuilderHome = ({
  cart,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: BuilderHomeProps) => {

  return (
    <div className="builder__wrapper">
      <div>
        Home
      </div>
      <CartView 
        cart={cart}
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        genFilter={genFilter}
        tierFilter={tierFilter}
      />
    </div>
  );
}
export default BuilderHome;