import { Side } from "@smogon/calc";
import { GenNum } from "../../../../types-queries/entities";
import Button from "../../../Reusables/Button/Button";
import Popup from "../../../Reusables/Popup/Popup";
import ThreeToggle from "../../../Reusables/ThreeToggle/ThreeToggle";
import { BooleanKeysOfSide, SIDES_GENS, SIDE_TEXT_MAP } from "../helpers";

type SidePopupProps = {
  gen: GenNum
  side: Side
  setSide: React.Dispatch<React.SetStateAction<Side>>
};

const SidePopup = ({
  gen,
  side,
  setSide,
}: SidePopupProps) => {
  const toggleSideValue = (key: BooleanKeysOfSide) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!side) return;

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
  
  return (
    <Popup
      trigger={<div>SIDE</div>}
      content={<div className="versus-controls__side">
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
        <div className="versus-controls__spikes">

        </div>
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
          />
        </div>
      </div>}
      orientation="bottom"
    />
  );
};

export default SidePopup;