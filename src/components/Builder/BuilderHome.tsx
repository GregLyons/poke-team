import {
  GenerationNum,
} from '../../types-queries/helpers';
import {
  TierFilter,
} from '../../utils/constants';

import {
  Cart,
  CartAction,
  TeamAction,
} from '../App';

import CartView from './CartView/CartView';
import PokemonSearch from './PokemonSearch';

type BuilderHomeProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const BuilderHome = ({
  cart,
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: BuilderHomeProps) => {
  console.log('builder');
  console.log(cart);
  console.log(gen);

  return (
    <div className="builder-wrapper">
      home
      <CartView 
        cart={cart}
      />
    </div>
  );
}
export default BuilderHome;