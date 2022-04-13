import { BGManager } from '../../../hooks/App/BGManager';
import { GenFilter } from '../../../hooks/App/GenFilter';
import { TierFilter, TierFilterAction } from "../../../hooks/App/TierFilter";
import {
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS
} from "../../../utils/smogonLogic";
import { VGCClass, VGC_CLASSES } from '../../../utils/vgcLogic';
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
  const handleTierSelect = (tier: SinglesTier | DoublesTier | VGCClass) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTierFilter({
      type: 'toggle_tier',
      payload: tier,
    });
  };

  const handleFormatSelect = (format: 'singles' | 'doubles' | 'vgc') => {
    dispatchTierFilter({
      type: 'set_format',
      payload: format,
    })
  };

  // useEffect(() => {
  //   if (genFilter.gen < 3) {
  //     dispatchTierFilter({
  //       type: 'remember_doubles',
  //     })
  //   }
  //   else {
  //     dispatchTierFilter({
  //       type: 'recall_doubles',
  //     });
  //   }
  // }, [genFilter, dispatchTierFilter]);

  const format = tierFilter.format;

  return (
    <ErrorBoundary orientation="bottom">
      <form className="tier-filter__wrapper">
        <fieldset className="tier-filter__buttons">
          <legend className="hidden-label">Select singles, doubles, or VGC format, if applicable</legend>
          <div className="tier-filter__singles">
            <label htmlFor="tier_filter_singles" className="hidden-label">Singles</label>
            <Button
              id="tier_filter_singles"
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
          </div>
          <div className="tier-filter__doubles">
            <label htmlFor="tier_filter_doubles" className="hidden-label">Doubles</label>
            <Button
              id="tier_filter_doubles"
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
          </div>
          <div className="tier-filter__vgc">
            <label htmlFor="tier_filter_vgc" className="hidden-label">VGC</label>
            <Button
              id="tier_filter_vgc"
              title='Filter Pokemon based on their restricted/mythical status.'
              active={tierFilter.format === 'vgc'}
              onClick={(e) => {
                e.preventDefault();
                handleFormatSelect('vgc')
              }}
              label='VGC'
              disabled={genFilter.gen < 4}
              immediate={false}
            />
          </div>
        </fieldset>
        <div className="tier-filter__select">
          <label htmlFor="tier_filter_trigger" className="hidden-label">Tier filter dropdown</label>
          <DropdownMenu
            triggerID="tier_filter_trigger"
            label={'TIER FILTER'}
            content={<fieldset className="tier-filter__tier-list">
              <legend className="hidden-label">{format === 'singles' ? 'Singles' : 'Doubles'} tier filter</legend>
              {format === 'singles' 
                ? SINGLES_TIERS.map(singlesTier => {
                    const checked = tierFilter.singlesTiers[singlesTier];

                    return (
                      <Checkbox
                        key={singlesTier}
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
                : format === 'doubles'
                  ? DOUBLES_TIERS.map(doublesTier => {
                      const checked = tierFilter.doublesTiers[doublesTier];

                      return (
                        <Checkbox
                          key={doublesTier}
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
                  : VGC_CLASSES.map(vgcClass => {
                    const checked = tierFilter.vgcClasses[vgcClass];

                    return (
                      <Checkbox
                        key={vgcClass}
                        id={vgcClass + '_tierFilter'}
                        label={vgcClass}
                        title={checked
                          ? `Exclude Pokemon in ${vgcClass}.`
                          : `Include Pokemon in ${vgcClass}.`
                        }
                        checked={checked}
                        onChange={handleTierSelect(vgcClass)}
                      />
                    );

                  })
              }
            </fieldset>}

            dropdownWidth={'clamp(8vw, 50ch, 90%)'}
            backgroundLight={bgManager.bgColor}
          />
        </div>
      </form>
    </ErrorBoundary>
  )
}

export default TierFilterForm;