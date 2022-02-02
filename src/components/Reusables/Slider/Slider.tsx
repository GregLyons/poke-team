import NumericalInput from "../NumericalInput";
import SliderBase from "./SliderBase";

type SliderProps = {
  min: number
  max: number
  value: number

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  
  onLeft?: boolean

  sliderWidth?: number | string
  numericalWidth?: number
}

const Slider = ({
  min,
  max,
  value,
  onChange,
  onIncrement,
  onDecrement,
  onLeft = true,
  sliderWidth = '150px',
  numericalWidth,
}: SliderProps) => {
  return (
    <div className="slider__wrapper">
      {onLeft && <NumericalInput
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        width={numericalWidth}
      />}
      <SliderBase
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        sliderWidth={sliderWidth}
      />
      {!onLeft && <NumericalInput
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        width={numericalWidth}
      />}
    </div>
  )
}

export default Slider;