import { Link } from "react-router-dom";


type EntityAccordionEntryProps = {
  parentEntityClass: string
  key: string
  name: string
  linkName: string
  description: string
  data?: {
    key: string
    value: string | number 
  }[]
}

const EntityAccordionEntry = ({
  parentEntityClass,
  key,
  name,
  linkName,
  description,
  data
}: EntityAccordionEntryProps) => {
  return (
    <div className="planner__accordion-row">
      <Link 
        to={`../${parentEntityClass}/${linkName}`}
        className="planner__accordion-row-name"
      >
        {name}
      </Link>
      <div className="planner__accordion-row-description">
        {description}
      </div>
      <div className="planner__accordion-row-data">
        {data && data.map(({key, value}) => (
          <>
            <div className="planner__accordion-row-data-head">
              {key}
            </div>
            <div className="planner__accordion-row-data-value">
              {value}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default EntityAccordionEntry;