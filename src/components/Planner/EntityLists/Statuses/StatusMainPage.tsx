import {
  GenerationNum,
} from "../../../../types-queries/helpers";
import {
  TierFilter,
} from '../../../../utils/smogonLogic';

import { 
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../../hooks/app-hooks';

import StatusSearch from "./StatusSearch"

type FieldStateMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const FieldStateMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
}: FieldStateMainPageProps) => {
  return (
    <StatusSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      genFilter={genFilter}
    />
  )
}

export default FieldStateMainPage;