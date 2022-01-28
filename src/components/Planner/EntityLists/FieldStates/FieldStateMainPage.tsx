import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import FieldStateSearch from "./FieldStateSearch"

type FieldStateMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const FieldStateMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: FieldStateMainPageProps) => {
  return (
    <FieldStateSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
    />
  )
}

export default FieldStateMainPage;