
import { BGManager, classWithBG, classWithBGShadow } from '../../hooks/App/BGManager';
import { Cart, } from '../../hooks/App/Cart';
import { Team } from '../../hooks/App/Team';
import { PokemonIconDispatches, PokemonIconFilters } from '../App';
import CartView from './CartView/CartView';
import TeamView from './TeamView/TeamView';

type BuilderHomeProps = {
  cart: Cart
  team: Team
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  bgManager: BGManager
}

const BuilderHome = ({
  cart,
  team,
  dispatches,
  filters,
  bgManager,
}: BuilderHomeProps) => {

  return (
    <div className={classWithBG("builder__wrapper", bgManager)}>
      <div className={classWithBGShadow("team-view__cell", bgManager)}>
        <TeamView
          team={team}
        />
      </div>
      <div className={classWithBGShadow("cart-view__cell", bgManager)}>
        <CartView
          cart={cart}
          dispatches={dispatches}
          filters={filters}
        />
      </div>
    </div>
  );
}
export default BuilderHome;