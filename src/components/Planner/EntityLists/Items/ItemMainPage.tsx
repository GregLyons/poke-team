import { GenerationNum } from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import ItemSearch from "./ItemSearch";

type ItemMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const ItemMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
      tierFilter={tierFilter}
    />
  )
}

export default ItemMainPage;