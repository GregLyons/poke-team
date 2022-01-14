import {
  GenerationNum,
} from '../../types-queries/Generation';
import {
  CartAction,
  TeamAction,
} from '../App';

import PokemonSearch from './PokemonSearch';

type BuilderProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const Builder = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: BuilderProps) => {

  return (
    <div className="builder-wrapper">
      <PokemonSearch 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
      />
    </div>
  );
}
export default Builder;