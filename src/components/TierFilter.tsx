import {
  ChangeEvent,
} from "react";
import {
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS,
  TierFilter,
} from "../utils/smogonLogic";

type TierFilterFormProps = {
  tierFilter: TierFilter
  handleTierModeChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleTierFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TierFilterForm = ({
  tierFilter,
  handleTierModeChange,
  handleTierFilterChange,
}: TierFilterFormProps) => {
  console.log(tierFilter);
  return (
    <form>
      <label>
        Singles mode
        <input 
          name="singles"
          type="checkbox"
          checked={tierFilter.mode === 'singles'}
          onChange={handleTierModeChange}
        />
      </label>
      {SINGLES_TIERS.map(tier => {
        return (
          <label key={tier}>
            {tier}
            <input
              name={tier}
              type="checkbox"
              checked={tierFilter.tiers[tier]}
              onChange={handleTierFilterChange}
              disabled={tierFilter.mode !== 'singles'}
            />
          </label>
        )
      })}
      <label>
        Doubles mode
        <input 
          name="doubles"
          type="checkbox"
          checked={tierFilter.mode === 'doubles'}
          onChange={handleTierModeChange}
        />
      </label>
      {DOUBLES_TIERS.map(tier => {
        return (
          <label key={tier}>
            {tier}
            <input
              name={tier}
              type="checkbox"
              checked={tierFilter.tiers[tier]}
              onChange={handleTierFilterChange}
              disabled={tierFilter.mode !== 'doubles'}
            />
          </label>
        )
      })}
    </form>
  )
}

export default TierFilterForm;