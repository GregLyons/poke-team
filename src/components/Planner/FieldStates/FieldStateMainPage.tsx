import { GenFilter } from "../../../hooks/App/GenFilter";

import FieldStateSearch from "./FieldStateSearch";

type FieldStateMainPageProps = {
  genFilter: GenFilter
}

const FieldStateMainPage = ({ 
  genFilter,
}: FieldStateMainPageProps) => {
  return (
    <FieldStateSearch
      genFilter={genFilter}
    />
  )
}

export default FieldStateMainPage;