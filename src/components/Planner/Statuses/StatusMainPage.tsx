import {
  GenerationNum,
} from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import StatusSearch from "./StatusSearch"

type StatusMainPageProps = {
  genFilter: GenFilter
}

const StatusMainPage = ({
  genFilter,
}: StatusMainPageProps) => {
  return (
    <StatusSearch
      genFilter={genFilter}
    />
  )
}

export default StatusMainPage;