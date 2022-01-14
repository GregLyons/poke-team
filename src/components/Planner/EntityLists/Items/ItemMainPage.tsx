import { GenerationNum } from "../../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import ItemSearch from "./ItemSearch";

type ItemMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const ItemMainPage = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: ItemMainProps) => {
  return (
    <ItemSearch 
      dispatchCart={dispatchCart}
      dispatchTeam={dispatchTeam}
      gen={gen}
    />
  )
}

export default ItemMainPage;