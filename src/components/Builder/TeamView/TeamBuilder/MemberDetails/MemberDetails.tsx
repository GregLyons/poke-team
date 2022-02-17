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
          <div className="member-details__header">
            Nickname
          </div>
        </div>
        <div className="member-details__icon">
          <div className="member-details__header">
            Icon
          </div>
        </div>
        <div className="member-details__name">
          <div className="member-details__header">
            Name
          </div>
        </div>
      </div>
      <div className="member-details__main-wrapper">
        <div className="member-details__moves">
          <div className="member-details__header">
            Move
          </div>
        </div>
        <div className="member-details__ability">
          <div className="member-details__header">
            Ability
          </div>
        </div>
        <div className="member-details__item">
          <div className="member-details__header">
            Item
          </div>
        </div>
        <div className="member-details__stats">
          <div className="member-details__header">
            Stats
          </div>
        </div>
      </div>
      <div className="member-details__extra-wrapper">
        <div className="member-details__level">
          <div className="member-details__header">
            Level
          </div>
        </div>
        <div className="member-details__gender">
          <div className="member-details__header">
            Gender
          </div>
        </div>
        <div className="member-details__shiny">
          <div className="member-details__header">
            Shiny
          </div>
        </div>
        <div className="member-details__happiness">
          <div className="member-details__header">
            Happiness
          </div>
        </div>
        <div className="member-details__cosmetic">
          <div className="member-details__header">
            Cosmetic
          </div>
        </div>
      </div>
    </div>
  )
};

export default MemberDetails;