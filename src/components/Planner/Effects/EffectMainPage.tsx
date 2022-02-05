import { GenFilter } from "../../../hooks/App/GenFilter";
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