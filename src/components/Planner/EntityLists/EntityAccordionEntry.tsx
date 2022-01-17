

type EntityAccordionEntryProps = {
  parentEntityClass: string
  key: string
  name: string
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
  description,
  data
}: EntityAccordionEntryProps) => {
  return (
    <>
      <div>{name}</div>
      <div>{description}</div>
      <div>{data}</div>
    </>
  )
}

export default EntityAccordionEntry;