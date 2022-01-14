import { GenerationNum } from "../../../../types-queries/Generation";
import EffectSearch from "./EffectSearchMain"

type EffectMainPageProps = {
  gen: GenerationNum
}

const EffectMainPage = ({ gen }: EffectMainPageProps) => {
  return (
    <EffectSearch 
      gen={gen}
    />
  )
}

export default EffectMainPage;