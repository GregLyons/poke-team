import {
  GenerationNum,
} from '../../types-queries/Generation';
import {
  TierFilter,
} from '../../utils/constants';

import {
  CartAction,
  TeamAction,
} from '../App';

import PokemonSearch from './PokemonSearch';

type BuilderProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const Builder = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: BuilderProps) => {

  return (
    <div className="builder-wrapper">
      <PokemonSearch 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        tierFilter={tierFilter}
      />
    </div>
  );
}
export default Builder;