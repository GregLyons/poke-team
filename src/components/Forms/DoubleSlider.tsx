import { useRef, useState } from "react";
import DoubleSliderBase from "./DoubleSliderBase"
import './Forms.css';

type DoubleSliderProps = {
  min: number
  minValue: number
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  noMinEntered: boolean

  max: number
  maxValue: number
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  noMaxEntered: boolean

  sliderWidth?: number | string
}

const DoubleSlider = ({
  min,
  minValue,
  onMinChange,
  noMinEntered,
  max,
  maxValue,
  onMaxChange,
  noMaxEntered,

  sliderWidth = '200px',
}: DoubleSliderProps) => {
  const [minFocused, setMinFocused] = useState(false);
  const [maxFocused, setMaxFocused] = useState(false);

  return (
    <div className="double-slider__wrapper">
      <input
        className="double-slider__input double-slider__input--left"
        type="number" 
        value={noMinEntered
          ? minFocused 
            ? '' 
            : min
          : minValue}
        onChange={onMinChange}
        onFocus={() => setMinFocused(true)}
        onBlur={() => setMinFocused(false)}
      />
      <DoubleSliderBase 
        min={min}
        minValue={noMinEntered ? min : minValue}
        onMinChange={onMinChange}
        max={max}
        maxValue={noMaxEntered ? max : maxValue}
        onMaxChange={onMaxChange}
        sliderWidth={sliderWidth}
      />
      <input
        className="double-slider__input double-slider__input--right"
        type="number" 
        value={noMaxEntered
          ? maxFocused 
            ? '' 
            : max
          : maxValue}
        onChange={onMaxChange}
        onFocus={() => setMaxFocused(true)}
        onBlur={() => setMaxFocused(false)}
      />
    </div>
  )
}

export default DoubleSlider