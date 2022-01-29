import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";
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