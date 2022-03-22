import { useEffect, useMemo } from 'react';
import { BGManager } from '../../../hooks/App/BGManager';
import { GenFilter } from '../../../hooks/App/GenFilter';
import { TierFilter, TierFilterAction } from "../../../hooks/App/TierFilter";
import {
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS
} from "../../../utils/smogonLogic";
import Button from '../../Reusables/Button/Button';
import Checkbox from '../../Reusables/Checkbox/Checkbox';
import DropdownMenu from "../../Reusables/DropdownMenu/DropdownMenu";
import ErrorBoundary from '../../Reusables/ErrorBoundary/ErrorBoundary';
import './TierFilterForm.css';


type TierFilterFormProps = {
  genFilter: GenFilter

  tierFilter: TierFilter
  dispatchTierFilter: React.Dispatch<TierFilterAction>

  bgManager: BGManager
}

const TierFilterForm = ({
  genFilter,
  tierFilter,
  dispatchTierFilter,
  bgManager,
}: TierFilterFormProps) => {
  const singlesItems = useMemo(() =>
    SINGLES_TIERS.map((singlesTier: SinglesTier) => {
      return {
        id: singlesTier,
        label: (
          <Button
            title={tierFilter.singlesTiers[singlesTier]
              ? `Exclude Pokemon in ${singlesTier}.`
              : `Include Pokemon in ${singlesTier}.`
            }
            active={tierFilter.singlesTiers[singlesTier]}
            label={singlesTier}
            onClick={e => e.preventDefault()}
            disabled={false}
            immediate={false}
          />
        ),
        selected: tierFilter.singlesTiers[singlesTier]
      }
    }),
  [tierFilter]);

  const doublesItems = useMemo(() => 
    DOUBLES_TIERS.map((doublesTier: DoublesTier) => {
      return {
        id: doublesTier,
        label: (
          <Button
            title={tierFilter.doublesTiers[doublesTier]
              ? `Exclude Pokemon in ${doublesTier}.`
              : `Include Pokemon in ${doublesTier}.`
            }
            active={tierFilter.doublesTiers[doublesTier]}
            label={doublesTier}
            onClick={e => e.preventDefault()}
            disabled={false}
            immediate={false}
          />
        ),
        selected: tierFilter.doublesTiers[doublesTier]
      }
    }),
  [tierFilter]);

  const handleTierSelect = (tier: SinglesTier | DoublesTier) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const format = tierFilter.format;

  return (
    <ErrorBoundary>
      <div className="tier-filter__wrapper">
        <form className="tier-filter__buttons">
          <label htmlFor="singles">
            <Button
              title='Filter Pokemon based on their tier in Singles battles.'
              active={tierFilter.format === 'singles'}
              onClick={(e) => {
                e.preventDefault();
                handleFormatSelect('singles');
              }}
              label='SINGLES'
              disabled={false}
              immediate={false}
            />
          </label>
          <label htmlFor="doubles">
            <Button
              title='Filter Pokemon based on their tier in Doubles battles.'
              active={tierFilter.format === 'doubles'}
              onClick={(e) => {
                e.preventDefault();
                handleFormatSelect('doubles')
              }}
              label='DOUBLES'
              disabled={genFilter.gen < 3}
              immediate={false}
            />
          </label>
        </form>
        <div className="tier-filter__select">
          <DropdownMenu
            label={'TIER FILTER'}
            content={<form>
              <fieldset>
                <legend>{format === 'singles' ? 'Singles' : 'Doubles'} tier filter</legend>
                {format === 'singles' 
                  ? SINGLES_TIERS.map(singlesTier => {
                      const checked = tierFilter.singlesTiers[singlesTier];

                      return (
                        <Checkbox
                          id={singlesTier + '_tierFilter'}
                          label={singlesTier}
                          title={checked
                            ? `Exclude Pokemon in ${singlesTier}.`
                            : `Include Pokemon in ${singlesTier}.`
                          }
                          checked={checked}
                          onChange={handleTierSelect(singlesTier)}
                        />
                      )
                    })
                  : DOUBLES_TIERS.map(doublesTier => {
                    const checked = tierFilter.doublesTiers[doublesTier];

                    return (
                      <Checkbox
                        id={doublesTier + '_tierFilter'}
                        label={doublesTier}
                        title={checked
                          ? `Exclude Pokemon in ${doublesTier}.`
                          : `Include Pokemon in ${doublesTier}.`
                        }
                        checked={checked}
                        onChange={handleTierSelect(doublesTier)}
                      />
                    );
                  })
                }
              </fieldset>
            </form>}

            dropdownWidth={'clamp(5vw, 50ch, 80%)'}
            backgroundLight={bgManager.bgColor}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default TierFilterForm;