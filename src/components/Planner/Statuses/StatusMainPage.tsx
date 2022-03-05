import { GenFilter } from "../../../hooks/App/GenFilter";

import StatusSearch from "./StatusSearch"

type StatusMainPageProps = {
  genFilter: GenFilter
}

const StatusMainPage = ({
  genFilter,
}: StatusMainPageProps) => {
  return (
    <StatusSearch
      genFilter={genFilter}
    />
  )
}

export default StatusMainPage;