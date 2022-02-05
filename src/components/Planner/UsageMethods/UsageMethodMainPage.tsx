import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { TierFilter } from "../../../hooks/App/TierFilter";

import UsageMethodSearch from "./UsageMethodSearch"

type UsageMethodMainPageProps = {
  genFilter: GenFilter
}

const UsageMethodMainPage = ({
  genFilter,
}: UsageMethodMainPageProps) => {
  return (
    <UsageMethodSearch
      genFilter={genFilter}
    />
  )
}

export default UsageMethodMainPage;