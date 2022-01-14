import { GenerationNum } from "../../../../types-queries/Generation";
import MoveSearchMain from "./MoveSearchMain";

type MoveMainProps = {
  gen: GenerationNum
}

const MoveMainPage = ({ gen }: MoveMainProps) => {
  return (
    <MoveSearchMain 
      gen={gen}
    />
  )
}

export default MoveMainPage;