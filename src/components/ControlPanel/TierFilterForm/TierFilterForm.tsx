import './TierFilter.css';

import { TierFilter, TierFilterAction } from "../../../hooks/App/TierFilter";
import {
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS,
} from "../../../utils/smogonLogic";
import DropdownMenu from "../../Reusables/Dropdown";
import { GenFilter, GenFilterAction } from '../../../hooks/App/GenFilter';

type TierFilterFormProps = {
  genFilter: GenFilter
  dispatchGenFilter: React.Dispatch<GenFilterAction>

  tierFilter: TierFilter
  dispatchTierFilter: React.Dispatch<TierFilterAction>
}

const TierFilterForm = ({
  genFilter,
  dispatchGenFilter,
  tierFilter,
  dispatchTierFilter,
}: TierFilterFormProps) => {

  const toggleSelect = (tier: SinglesTier | DoublesTier) => {
    dispatchTierFilter({
      type: 'toggle_tier',
      payload: tier,
    });
  };

  const handleFormatSelect = (format: 'singles' | 'doubles') => {
    dispatchTierFilter({
      type: 'set_format',
      payload: format,
    })
  };

  return (
    <div className="tier-filter__wrapper">
      <form>
        <div className="tier-filter__buttons">
          <label htmlFor="singles">
            <button
              className={`
                tier-filter__button
                ${tierFilter.format === 'singles' 
                  ? 'tier-filter__button--active'
                  : ''
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                handleFormatSelect('singles')
              }}
            >
              SINGLES
            </button>
            <button
              className={`
                tier-filter__button
                ${tierFilter.format === 'doubles' 
                  ? 'tier-filter__button--active'
                  : ''
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                handleFormatSelect('doubles')
              }}
            >
              DOUBLES
            </button>
          </label>
        </div>
        {/* <label htmlFor="Select the tiers in the given format.">
          <DropdownMenu 
            title="Select tiers"
            items={tierFilter.format === 'singles'
              // Explicitly state type to help infer generics
              ? SINGLES_TIERS.map((tier: SinglesTier | DoublesTier) => {
                  const selected = tierFilter.tiers[tier];
                  const label = (
                    <label htmlFor={`Toggle ${tier}.`}>
                      <input
                        type="checkbox"
                        checked={selected}
                      />
                      {tier}
                    </label>
                  );

                  return {
                    id: tier,
                    label,
                    selected,
                  }
                })
              : DOUBLES_TIERS.map(tier => {
                const selected = tierFilter.tiers[tier];
                const label = (
                  <label htmlFor={`Toggle ${tier}.`}>
                    <input
                      type="checkbox"
                      checked={selected}
                    />
                    {tier}
                  </label>
                );

                return {
                  id: tier,
                  label,
                  selected,
                }
              })}
            toggleSelect={toggleSelect}
          />
        </label> */}
      </form>
    </div>
  )
}

export default TierFilterForm;