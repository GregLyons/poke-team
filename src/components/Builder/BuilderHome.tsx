
import { Cart, CartAction } from '../../hooks/App/Cart';
import { GenFilter } from '../../hooks/App/GenFilter';
import { PokemonFilter } from '../../hooks/App/PokemonFilter';
import { TeamAction } from '../../hooks/App/Team';
import { TierFilter } from '../../hooks/App/TierFilter';
import CartView from './CartView/CartView';

type BuilderHomeProps = {
  cart: Cart
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const BuilderHome = ({
  cart,
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
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
        pokemonFilter={pokemonFilter}
      />
    </div>
  );
}
export default BuilderHome;