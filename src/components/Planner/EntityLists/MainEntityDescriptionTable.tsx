import {
  VersionDependentDescription,
} from "../../../types-queries/Planner/helpers";

type MainEntityDescriptionsProps = {
  descriptions: VersionDependentDescription[]
}

const MainEntityDescriptionTable = ({
  descriptions,
}: MainEntityDescriptionsProps) => {
  return (
    <div className='planner__page-descriptions-table'>
      {descriptions.map(({text, code}) => {
        return (
          <div className='planner__page-description--main-entity'>
            <div className='planner__page-description-code'>
              {code}
            </div>
            <div className='planner__page-description-text'>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainEntityDescriptionTable;