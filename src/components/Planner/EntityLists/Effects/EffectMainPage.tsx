import {
  GenerationNum,
} from "../../../../types-queries/Generation";
import { 
  CartAction,
  TeamAction,
} from "../../../App";
import EffectSearch from "./EffectSearchMain"

type EffectMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const EffectMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: EffectMainPageProps) => {
  return (
    <EffectSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default EffectMainPage;