
import { Cart, } from '../../hooks/App/Cart';
import { PokemonIconDispatches, PokemonIconFilters } from '../App';
import CartView from './CartView/CartView';

type BuilderHomeProps = {
  cart: Cart
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

const BuilderHome = ({
  cart,
  dispatches,
  filters,
}: BuilderHomeProps) => {

  return (
    <div className="builder__wrapper">
      <div>
        Home
      </div>
      <CartView 
        cart={cart}
        dispatches={dispatches}
        filters={filters}
      />
    </div>
  );
}
export default BuilderHome;