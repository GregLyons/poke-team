import './ThreeToggle.css';

type ThreeToggleProps = {
  label: string
  selection: boolean | null
  setSelection: ((newSelection: boolean | null) => void) | undefined

  buttonLabels?: string[]
  background?: boolean
  disabled?: (boolean | null)[]
};

const ThreeToggle = ({
  label,
  selection,
  setSelection,

  buttonLabels = ['ANY', 'YES', 'NO'],
  background = true,
  disabled = [],
}: ThreeToggleProps) => {
  return (
    <fieldset className="three-toggle__wrapper"
      style={{
        background: background ? '' : 'none',
        boxShadow: background ? '' : 'none',
      }}
    >
      <legend className="hidden-label">{label}</legend>
      <div className="three-toggle__label">
        {label}
      </div>
      <div className="three-toggle__buttons">
        <label htmlFor={label.replace(/\s/g, '_') + '_null'} className="hidden-label">{buttonLabels[0]}</label>
        <button
          id={label.replace(/\s/g, '_') + '_null'}
          className={`
            three-toggle__button
            three-toggle__null
            ${selection === null && !disabled.includes(null)
              ? '--active'
              : ''
            }
            ${disabled.includes(null)
              ? '--disabled'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(null);
          }}
          disabled={disabled.includes(null)}
          aria-disabled={disabled.includes(null)}
        >
          {buttonLabels[0]}
        </button>
        <label htmlFor={label.replace(/\s/g, '_') + '_true'} className="hidden-label">{buttonLabels[1]}</label>
        <button
          id={label.replace(/\s/g, '_') + '_true'}
          className={`
            three-toggle__button
            three-toggle__true
            ${selection === true && !disabled.includes(true)
              ? '--active'
              : ''
            }
            ${disabled.includes(true)
              ? '--disabled'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(true);
          }}
          disabled={disabled.includes(true)}
          aria-disabled={disabled.includes(true)}
        >
          {buttonLabels[1]}
        </button>
        <label htmlFor={label.replace(/\s/g, '_') + '_false'} className="hidden-label">{buttonLabels[2]}</label>
        <button
          id={label.replace(/\s/g, '_') + '_false'}
          className={`
            three-toggle__button
            three-toggle__false
            ${selection === false && !disabled.includes(false)
              ? '--active'
              : ''
            }
            ${disabled.includes(false)
              ? '--disabled'
              : ''
            }
          `}
          onClick={e => {
            e.preventDefault();
            setSelection && setSelection(false);
          }}
          disabled={disabled.includes(false)}
          aria-disabled={disabled.includes(false)}
        >
          {buttonLabels[2]}
        </button>
      </div>
    </fieldset>
  )
};

export default ThreeToggle;