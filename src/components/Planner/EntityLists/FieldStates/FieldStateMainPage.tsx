import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import FieldStateSearch from "./FieldStateSearch"

type FieldStateMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const FieldStateMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: FieldStateMainPageProps) => {
  return (
    <FieldStateSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default FieldStateMainPage;