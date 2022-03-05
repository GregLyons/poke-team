import {
  GenNum,
} from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import StatSearch from "./StatSearch"
import { BGManager } from "../../../hooks/App/BGManager";

type StatMainPageProps = {
  genFilter: GenFilter
}

const StatMainPage = ({
  genFilter,
}: StatMainPageProps) => {
  return (
    <StatSearch
      genFilter={genFilter}
    />
  )
}

export default StatMainPage;