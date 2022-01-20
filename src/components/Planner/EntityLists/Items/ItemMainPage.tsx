import { GenerationNum } from "../../../../types-queries/Generation";
import {
  TierFilter,
} from "../../../../utils/constants";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

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
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default ItemMainPage;