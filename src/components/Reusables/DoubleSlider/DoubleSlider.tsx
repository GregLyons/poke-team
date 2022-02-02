import { useState } from "react";
import DoubleSliderBase from "./DoubleSliderBase"
import '../Forms.css';

type DoubleSliderProps = {
  min: number
  minValue: number
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMinBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void

  max: number
  maxValue: number
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMaxBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void

  sliderWidth?: number | string
}

const DoubleSlider = ({
  min,
  minValue,
  onMinChange,
  onMinBlur,

  max,
  maxValue,
  onMaxBlur,
  onMaxChange,

  sliderWidth = '200px',
}: DoubleSliderProps) => {
  const [minFocused, setMinFocused] = useState(false);
  const [minNumber, setMinNumber] = useState(0);
  const [maxFocused, setMaxFocused] = useState(false);
  const [maxNumber, setMaxNumber] = useState(255);
  
  return (
    <div className="double-slider__wrapper">
      <input
        className="double-slider__input double-slider__input--left"
        type="number"
        // If the user is focused on the input, the value is equal to whatever they are typing in. Only once focus is lost will minValue itself will update. 
        value={minFocused
          ? minNumber
          : minValue}
        // Update minNumber so that value is reflected in input
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMinNumber(0);
          else setMinNumber(value);
          setMinNumber(value);
        }}
        // When user is not focused, the displayed number will be minValue. Once the user focuses, reset min number to equal minValue so that the displayed number does not change.
        onFocus={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMinNumber(0);
          else setMinNumber(value);
          setMinFocused(true)
        }}
        // Update minValue
        onBlur={(e) => {
          setMinFocused(false);
          onMinBlur(e);
        }}
      />
      <DoubleSliderBase 
        min={min}
        minValue={minValue}
        onMinChange={onMinChange}
        max={max}
        maxValue={maxValue}
        onMaxChange={onMaxChange}
        sliderWidth={sliderWidth}
      />
      <input
        className="double-slider__input double-slider__input--right"
        type="number" 
        // If the user is focused on the input, the value is equal to whatever they are typing in. Only once focus is lost will maxValue itself will update. 
        value={maxFocused
          ? maxNumber
          : maxValue}
        // Update maxNumber so that value is reflected in input
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMaxNumber(255);
          else setMaxNumber(value);
          setMaxNumber(value);
        }}
        // When user is not focused, the displayed number will be maxValue. Once the user focuses, reset max number to equal maxValue so that the displayed number does not change.
        onFocus={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMaxNumber(255);
          else setMaxNumber(value);
          setMaxFocused(true)
        }}
        // Update maxValue
        onBlur={(e) => {
          setMaxFocused(false);
          onMaxBlur(e);
        }}
      />
    </div>
  )
}

export default DoubleSlider