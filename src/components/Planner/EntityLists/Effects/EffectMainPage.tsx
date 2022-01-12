import EffectSearch from "./EffectSearch"
import { EFFECT_SEARCH_QUERY } from "./effectQueries"

const EffectMainPage = () => {
  return (
    <EffectSearch
      query={EFFECT_SEARCH_QUERY}
    />
  )
}

export default EffectMainPage;