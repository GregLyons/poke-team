import './Pages.css';


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
    <div className='planner-page__descriptions-table'>
      {descriptions.map(({text, code}) => {
        return (
          <div className='planner-page__description--main-entity'>
            <div className='planner-page__description-code'>
              {code}
            </div>
            <div className='planner-page__description-text'>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainEntityDescriptionTable;