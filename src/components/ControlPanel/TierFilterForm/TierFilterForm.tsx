import {
  ChangeEvent, useState,
} from "react";
import { TierFilterAction } from "../../../hooks/app-hooks";
import {
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS,
  TierFilter,
} from "../../../utils/smogonLogic";
import DropdownMenu from "../../Reusables/Dropdown";

type TierFilterFormProps = {
  dispatchTierFilter: React.Dispatch<TierFilterAction>
  tierFilter: TierFilter

}

const TierFilterForm = ({
  dispatchTierFilter,
  tierFilter,
}: TierFilterFormProps) => {

  const toggleSelect = (tier: SinglesTier | DoublesTier) => {
    dispatchTierFilter({
      type: 'toggle_tier',
      payload: tier,
    });
  }

  return (
    <div className="control-panel__tier-filter-wrapper">
      <form>
        <label htmlFor="Select whether you're playing 'Singles' or 'Doubles'.">
          Format:
          <select
            name="format"
            value={tierFilter.format === 'singles' ? 'singles' : 'doubles'}
            onChange={(e) => {
              dispatchTierFilter({
                type: 'set_format',
                payload: (e.target.value as 'singles' | 'doubles'),
              });
            }}
          >
            <option value="singles">Singles</option>
            <option value="doubles">Doubles</option>
          </select>
        </label>
        <label htmlFor="Select the tiers in the given format.">
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
          {/* Tiers:
          <select
            name="tiers"
            onChange={(e) => {
              console.log(e.target.value);
              dispatchTierFilter({
                type: 'toggle_tier',
                payload: (e.target.value as SinglesTier | DoublesTier),
              });
            }}
            multiple
          >
            {tierFilter.format === 'singles' 
              ? SINGLES_TIERS.map(tier => {
                return (
                  <option
                    value={tier}
                    selected={tierFilter.tiers[tier]}
                  >
                    {tier}
                  </option>
                )
              })
              : DOUBLES_TIERS.map(tier => {
                return (
                  <option
                    value={tier}
                    selected={tierFilter.tiers[tier]}
                  >
                    {tier}
                  </option>
                )
              })}
          </select> */}
        </label>
      </form>
    </div>
  )
}

export default TierFilterForm;