import { useRef } from "react";
import './NumericalInput.css';

type NumericalInputProps = {
  titleFor: string

  min: number
  max: number
  value: number | ''
  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void

  onLeft?: boolean
  width?: number
}

const NumericalInput = ({
  titleFor,

  min,
  max,
  value,

  onChange,
  onIncrement,
  onDecrement,
  onFocus,
  onBlur,

  onLeft = true,
  width = 4,
}: NumericalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // If the user is focused on the input, the value is equal to whatever they are typing in. Only once focus is lost will value itself update. 
    
    // When user is not focused, the displayed number will be value. Once the user focuses, reset min number to equal value so that the displayed number does not change.
    <div
      className={`
        numerical-input__wrapper
        ${onLeft
          ? 'numerical-input__wrapper --left'
          : 'numerical-input__wrapper --right'
        }
      `}
    >
      {onLeft &&
        <div className="numerical-input__arrow-wrapper">
          <label htmlFor={titleFor + '_increment'} className="hidden-label">Increment {titleFor}</label>
          <button
            title={`Increase ${titleFor} by 1`}
            onClick={onIncrement}

            id={titleFor + '_increment'}
            className="numerical-input__up-arrow"
          />
          <label htmlFor={titleFor + '_decrement'} className="hidden-label">Decrement {titleFor}</label>
          <button
            title={`Decrease ${titleFor} by 1`}
            onClick={onDecrement}

            id={titleFor + '_decrement'}
            className="numerical-input__down-arrow"
          />
        </div>
      }
      <input
        title={`Enter value for ${titleFor}`}
        ref={inputRef}
        min={min}
        max={max}
        type="number"
        value={value}
        onChange={onChange}
        style={{
          width: `${width}ch`,
        }}
        onFocus={onFocus}
        onBlur={onBlur}

        id={`${titleFor}_numerical_input`}
        className="numerical-input"
      />
      {!onLeft && 
        <div className="numerical-input__arrow-wrapper">
          <label htmlFor={titleFor + '_increment'} className="hidden-label">Increment {titleFor}</label>
          <button
            title={`Increase ${titleFor} by 1`}
            onClick={onIncrement}

            id={titleFor + '_increment'}
            className="numerical-input__up-arrow"
          />
          <label htmlFor={titleFor + '_decrement'} className="hidden-label">Decrement {titleFor}</label>
          <button
            title={`Decrease ${titleFor} by 1`}
            onClick={onDecrement}

            id={titleFor + '_decrement'}
            className="numerical-input__down-arrow"
          />
        </div>
      }
    </div>
  )
};

export default NumericalInput;