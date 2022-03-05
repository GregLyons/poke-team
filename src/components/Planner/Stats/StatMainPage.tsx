import { GenFilter } from "../../../hooks/App/GenFilter";

import StatSearch from "./StatSearch";

type StatMainPageProps = {
  genFilter: GenFilter
}

const StatMainPage = ({
  genFilter,
}: StatMainPageProps) => {
  return (
    <StatSearch
      genFilter={genFilter}
    />
  )
}

export default StatMainPage;