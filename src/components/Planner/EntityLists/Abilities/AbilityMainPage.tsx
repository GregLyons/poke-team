import {
  GenerationNum,
} from "../../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import AbilitySearch from "./AbilitySearch";

type AbilityMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const AbilityMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: AbilityMainPageProps) => {
  return (
    <AbilitySearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default AbilityMainPage;