import {
  GenerationNum,
} from "../../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import StatusSearch from "./StatusSearch"

type FieldStateMainPageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
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