import {
  ChangeEvent,
} from "react";
import {
  SinglesTier,
  SINGLES_TIERS,
  TierFilter,
} from "../utils/constants";

type TierFilterFormProps = {
  tierFilter: TierFilter
  handleTierFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TierFilterForm = ({
  tierFilter,
  handleTierFilterChange,
}: TierFilterFormProps) => {
  return (
    <form>
      {SINGLES_TIERS.map(tier => {
        return (
          <label key={tier}>
            {tier}
            <input
              name={tier}
              type="checkbox"
              checked={tierFilter[tier]}
              onChange={handleTierFilterChange}
            />
          </label>
        )
      })}
    </form>
  )
}

export default TierFilterForm;