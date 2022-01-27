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

import TypeSearch from "./TypeSearch"

type TypeMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const TypeMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: TypeMainPageProps) => {
  return (
    <TypeSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
      tierFilter={tierFilter}
    />
  )
}

export default TypeMainPage;