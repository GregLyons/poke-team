import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon";
import { Dispatches, Filters } from "../../../../App";

import './MemberDetails.css';

type MemberDetailsProps = {
  dispatches: Dispatches
  filters: Filters
};

const MemberDetails = ({
  dispatches,
  filters,
}: MemberDetailsProps) => {
  return (
    <div className="member-details__wrapper">
      <div className="member-details__name-wrapper">
        <div className="member-details__nickname">
          Nickname
        </div>
        <div className="member-details__icon">
          Icon
        </div>
        <div className="member-details__name">
          Name
        </div>
      </div>
      <div className="member-details__main-wrapper">
        <div className="member-details__moves">
          Move
        </div>
        <div className="member-details__ability">
          Ability
        </div>
        <div className="member-details__item">
          Item
        </div>
        <div className="member-details__stats">
          Stats
        </div>
      </div>
      <div className="member-details__extra-wrapper">
        <div className="member-details__level">
          <span>Level</span>
        </div>
        <div className="member-details__gender">
          <span>Gender</span>
        </div>
        <div className="member-details__shiny">
          <span>Shiny</span>
        </div>
        <div className="member-details__happiness">
          <span>Happiness</span>
        </div>
        <div className="member-details__cosmetic">
          <span>Cosmetic</span>
        </div>
      </div>
    </div>
  )
};

export default MemberDetails;