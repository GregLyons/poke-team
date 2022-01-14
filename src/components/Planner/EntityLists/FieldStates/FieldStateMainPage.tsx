import {
  GenerationNum,
} from "../../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import FieldStateSearch from "./FieldStateSearch"

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
    <FieldStateSearch
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default FieldStateMainPage;