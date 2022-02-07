
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
    <div>
      This is the Builder page
    </div>
  );
}
export default BuilderHome;