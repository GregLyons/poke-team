import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";
import EffectSearch from "./EffectSearch"

type EffectMainPageProps = {
  genFilter: GenFilter
}

const EffectMainPage = ({
  genFilter,
}: EffectMainPageProps) => {
  return (
    <EffectSearch
      genFilter={genFilter}
    />
  )
}

export default EffectMainPage;