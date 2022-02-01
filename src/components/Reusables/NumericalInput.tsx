import { useRef } from "react";
import FontAwesome from "react-fontawesome";

type NumericalInputProps = {
  min: number
  max: number
  value: number
  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

  width?: number
}

const NumericalInput = ({
  min,
  max,
  value,
  onChange,
  onIncrement,
  onDecrement,

  width = 4,
}: NumericalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="numerical-input__wrapper">
      <input
        ref={inputRef}
        min={min}
        max={max}
        className="numerical-input"
        type="number"
        value={value}
        onChange={onChange}
        style={{
          width: `${width}ch`
        }}
      />
      <div className="numerical-input__arrow-wrapper">
        <FontAwesome
          className="numerical-input__arrow"
          name="angle-up"
          onClick={e => onIncrement(e)}
        />
        <FontAwesome
          className="numerical-input__arrow"
          name="angle-down"
          onClick={onDecrement}
        />
      </div>
    </div>
  )
};

export default NumericalInput;