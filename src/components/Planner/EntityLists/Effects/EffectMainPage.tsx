import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EffectSearch from "./EffectSearch"

type EffectMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
}

const EffectMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: EffectMainPageProps) => {
  return (
    <EffectSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
    />
  )
}

export default EffectMainPage;