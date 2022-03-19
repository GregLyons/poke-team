import './ThreeToggle.css';

type ThreeToggleProps = {
  label: string
  selection: boolean | null
  setSelection: ((newSelection: boolean | null) => void) | undefined
};

const ThreeToggle = ({
  label,
  selection,
  setSelection,
}: ThreeToggleProps) => {
  return (
    <div className="three-toggle__wrapper">
      <div className="three-toggle__label">
        {label}
      </div>
      <div className="three-toggle__buttons">
        <button
          className={`
            three-toggle__button
            three-toggle__null
            ${selection === null
              ? '--active'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(null);
          }}
        >
          ANY
        </button>
        <button
          className={`
            three-toggle__button
            three-toggle__true
            ${selection === true
              ? '--active'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(true);
          }}
        >
          YES
        </button>
        <button
          className={`
            three-toggle__button
            three-toggle__false
            ${selection === false
              ? '--active'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(false);
          }}
        >
          NO
        </button>
      </div>
    </div>
  )
};

export default ThreeToggle;