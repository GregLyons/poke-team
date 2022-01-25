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

import StatusSearch from "./StatusSearch"

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
    <StatusSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default FieldStateMainPage;