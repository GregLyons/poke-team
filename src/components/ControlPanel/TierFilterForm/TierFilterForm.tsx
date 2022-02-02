import './TierFilter.css';

import { TierFilter, TierFilterAction } from "../../../hooks/App/TierFilter";
import {
  DoublesTier,
  DOUBLES_TIERS,
  isSinglesTier,
  SinglesTier,
  SINGLES_TIERS,
} from "../../../utils/smogonLogic";
import DropdownMenu from "../../Reusables/DropdownMenu";
import { GenFilter, GenFilterAction } from '../../../hooks/App/GenFilter';
import { useEffect } from 'react';

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

  const handleTierSelect = (tier: SinglesTier | DoublesTier) => {
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

  // Remove doubles prior to Gen 3
  useEffect(() => {
    if (genFilter.gen < 3) {
      dispatchTierFilter({
        type: 'remember_doubles',
      })
    }
    else {
      dispatchTierFilter({
        type: 'recall_doubles',
      });
    }
  }, [genFilter, dispatchTierFilter]);
  console.log(tierFilter);

  return (
    <form className="tier-filter__wrapper">
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
        </label>
        <label htmlFor="doubles">
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
            disabled={genFilter.gen < 3}
          >
            DOUBLES
          </button>
        </label>
      </div>
      <label htmlFor="Tier select">
        {tierFilter.format === 'singles'
          ? <DropdownMenu 
              title="SINGLES tiers"
              items={
                SINGLES_TIERS.map((singlesTier: SinglesTier) => {
                  return {
                    id: singlesTier,
                    label: (
                      <button
                        className={`
                        tier-filter__button
                        ${tierFilter.singlesTiers[singlesTier] 
                          ? 'tier-filter__button--active'
                          : ''
                        }
                        `}
                      >
                        {singlesTier}
                      </button>
                    ),
                    selected: tierFilter.singlesTiers[singlesTier]
                  }
                })
              }
              toggleSelect={handleTierSelect}
              columnWidth={'5ch'}
            />
          : <DropdownMenu 
              title="DOUBLES tiers"
              items={
                DOUBLES_TIERS.map((doublesTier: DoublesTier) => {
                  return {
                    id: doublesTier,
                    label: (
                      <button
                        className={`
                        tier-filter__button
                        ${tierFilter.doublesTiers[doublesTier] 
                          ? 'tier-filter__button--active'
                          : ''
                        }
                        `}
                      >
                        {doublesTier}
                      </button>
                    ),
                    selected: tierFilter.doublesTiers[doublesTier]
                  }
                })
              }
              toggleSelect={handleTierSelect}
              columnWidth={'6ch'}
            />
        }
      </label>
      {/* <label htmlFor="Tier select">
        {(tierFilter.format === 'singles' ? SINGLES_TIERS : DOUBLES_TIERS).map((tier: SinglesTier | DoublesTier) => {
          if (isSinglesTier(tier)) {
            console.log(tier, 'is singles tier');
            return (
              <button
                className={`
                  tier-filter__button
                  ${tierFilter.singlesTiers[tier]
                    ? 'tier-filter__button--active'
                    : ''
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  handleTierSelect(tier)
                }}
                disabled={tierFilter.format !== 'singles'}
              >
                {tier}
              </button>
            );
          }
          else {
            return (
              <button
                className={`
                  tier-filter__button
                  ${tierFilter.doublesTiers[tier]
                    ? 'tier-filter__button--active'
                    : ''
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  handleTierSelect(tier)
                }}
                disabled={tierFilter.format !== 'doubles'}
              >
                {tier}
              </button>
            );
          }
        })}
      </label> */}
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
  )
}

export default TierFilterForm;