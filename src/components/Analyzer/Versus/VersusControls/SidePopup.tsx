import { Side } from "@smogon/calc";
import { GenNum } from "../../../../types-queries/entities";
import Button from "../../../Reusables/Button/Button";
import Popup from "../../../Reusables/Popup/Popup";
import Slider from "../../../Reusables/Slider/Slider";
import ThreeToggle from "../../../Reusables/ThreeToggle/ThreeToggle";
import { BooleanKeysOfSide, SIDES_GENS, SIDE_TEXT_MAP } from "../helpers";

type SidePopupProps = {
  gen: GenNum
  side: Side
  setSide: React.Dispatch<React.SetStateAction<Side>>
  whichSide: 'your' | 'enemy'
};

const SidePopup = ({
  gen,
  side,
  setSide,
  whichSide,
}: SidePopupProps) => {
  const toggleSideValue = (key: BooleanKeysOfSide) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    return setSide(new Side({
      ...side,
      [key]: !side[key],
    }));
  };

  const setSwitching = (newSwitching: boolean | null) => {
    switch(newSwitching) {
      case null:
        return setSide(new Side({
          ...side,
          isSwitching: 'in',
        }));
      
      case true:
        return setSide(new Side({
          ...side,
          isSwitching: 'out',
        }));

      case false:
        return setSide(new Side({
          ...side,
          isSwitching: undefined,
        }));
    }
  };

  const setSpikes = (newValue: number) => {
    return setSide(new Side({
      ...side,
      spikes: newValue,
    }));
  };
  
  return (
    <Popup
      trigger={<div
        title={`Change conditions for ${whichSide} side.`}
      >
        SIDE
      </div>}
      content={<div className="versus-controls__side">
        <h3>Flags</h3>
        <div className="versus-controls__side-toggles">
          {SIDES_GENS.map(sideAndGen => {
            const [sideKey, sideGen] = sideAndGen;
            const label = SIDE_TEXT_MAP.get(sideKey) || '';

            if (['isSwitching', 'spikes'].includes(sideKey)) return;
            
            const booleanSideKey = sideKey as BooleanKeysOfSide;

            // If boolean sideKey, return Button
            if (booleanSideKey) {
              const active = side[booleanSideKey];
              return (
                <Button
                  key={sideKey}
                  title={active
                    ? `Turn off ${label}.`
                    : `Turn on ${label}.`
                  }
                  label={label}

                  onClick={toggleSideValue(booleanSideKey)}
                  active={active}
                  disabled={sideGen > gen}
                  immediate={false}
                />
              );
            }
            return;
          })}
        </div>
        <h3>Spikes</h3>
        <div className="versus-controls__spikes">
          {gen > 1 && <Slider
            titleFor="layers of spikes."

            min={0}
            max={3}
            value={side.spikes}
            updateValue={setSpikes}
            
            sliderWidth="100px"
            numericalWidth={1}
          />}
        </div>
        <h3>Switching</h3>
        <div className="versus-controls__switching">
          <ThreeToggle
            label="SWITCHING"
            selection={side.isSwitching === 'in'
              ? null
              : side.isSwitching === 'out'
                ? true
                : false
            }
            setSelection={setSwitching}
            buttonLabels={['IN', 'OUT', 'NO']}
            background={false}
          />
        </div>
      </div>}
      orientation="bottom"
    />
  );
};

export default SidePopup;