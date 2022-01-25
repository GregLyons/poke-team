import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from "../../../../utils/constants";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import TypeSearch from "./TypeSearch"

type TypeMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const TypeMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: TypeMainPageProps) => {
  return (
    <TypeSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
      tierFilter={tierFilter}
    />
  )
}

export default TypeMainPage;