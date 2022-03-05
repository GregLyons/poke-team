import {
  GenNum,
} from "../../../types-queries/helpers";
import { TierFilter } from "../../../hooks/App/TierFilter";

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { PokemonFilter } from "../../../hooks/App/PokemonFilter";
import { TeamAction } from "../../../hooks/App/Team";

import FieldStateSearch from "./FieldStateSearch"
import { BGAction } from "../../../hooks/App/BGManager";

type FieldStateMainPageProps = {
  genFilter: GenFilter
}

const FieldStateMainPage = ({ 
  genFilter,
}: FieldStateMainPageProps) => {
  return (
    <FieldStateSearch
      genFilter={genFilter}
    />
  )
}

export default FieldStateMainPage;