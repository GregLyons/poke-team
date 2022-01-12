import MoveSearch from "./MoveSearch"
import { MOVE_SEARCH_QUERY } from "./moveQueries"

const MoveMainPage = () => {
  return (
    <MoveSearch
      isMainSearchPage={true}
      query={MOVE_SEARCH_QUERY}
    />
  )
}

export default MoveMainPage;