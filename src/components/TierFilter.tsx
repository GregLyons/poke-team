import {
  ChangeEvent,
} from "react";
import {
  DOUBLES_TIERS,
  SINGLES_TIERS,
  TierFilter,
} from "../utils/smogonLogic";

type TierFilterFormProps = {
  tierFilter: TierFilter
  handleTierModeChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleTierFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  toggleSelectionMode: () => void
}

const TierFilterForm = ({
  tierFilter,
  handleTierModeChange,
  handleTierFilterChange,
  toggleSelectionMode,
}: TierFilterFormProps) => {
  return (
    <form>
      <label>
        Singles mode
        <input 
          name="singles"
          type="checkbox"
          checked={tierFilter.format === 'singles'}
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
              disabled={tierFilter.format !== 'singles'}
            />
          </label>
        )
      })}
      <br />
      <label>
        Doubles mode
        <input 
          name="doubles"
          type="checkbox"
          checked={tierFilter.format === 'doubles'}
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
              disabled={tierFilter.format !== 'doubles'}
            />
          </label>
        )
      })}
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleSelectionMode();
        }}
      >
        {tierFilter.selectionMode === 'exact' ? 'Change to range mode' : 'Change to exact mode'}
      </button>
    </form>
  )
}

export default TierFilterForm;