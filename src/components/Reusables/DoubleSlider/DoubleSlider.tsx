import { useState } from "react";
import DoubleSliderBase from "./DoubleSliderBase"
import './DoubleSlider.css';
import NumericalInput from "../NumericalInput/NumericalInput";

type DoubleSliderProps = {
  titleFor: string

  min: number
  minValue: number
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMinBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onMinIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMinDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void


  max: number
  maxValue: number
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMaxBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onMaxIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMaxDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

  sliderWidth?: number | string
}

const DoubleSlider = ({
  titleFor,

  min,
  minValue,
  onMinChange,
  onMinBlur,
  onMinIncrement,
  onMinDecrement,
  
  max,
  maxValue,
  onMaxBlur,
  onMaxChange,
  onMaxIncrement,
  onMaxDecrement,

  sliderWidth = '200px',
}: DoubleSliderProps) => {
  const [minFocused, setMinFocused] = useState(false);
  const [minNumber, setMinNumber] = useState(min);
  const [maxFocused, setMaxFocused] = useState(false);
  const [maxNumber, setMaxNumber] = useState(255);

  // Update minNumber so that value is reflected in input
  const onMinFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setMinNumber(0);
    else setMinNumber(value);
    setMinFocused(true);
  }

  // Update maxNumber so that value is reflected in input
  const onMaxFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setMaxNumber(255);
    else setMaxNumber(value);
    setMaxFocused(true);
  }
  
  return (
    <div className="double-slider__wrapper">
      <NumericalInput
        titleFor={'minimum ' + titleFor}
        min={min}
        max={max}
        value={minFocused
          ? minNumber
          : minValue}

        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMinNumber(0);
          else setMinNumber(value);
          setMinNumber(value);
        }}
        onFocus={onMinFocus}
        // Update minValue
        onBlur={(e) => {
          setMinFocused(false);
          onMinBlur(e);
        }}
        onIncrement={onMinIncrement}
        onDecrement={onMinDecrement}

        width={3}
      />
      <DoubleSliderBase
        titleFor={titleFor}
        min={min}
        minValue={minValue}
        onMinChange={onMinChange}
        max={max}
        maxValue={maxValue}
        onMaxChange={onMaxChange}
        sliderWidth={sliderWidth}
      />
      <NumericalInput
        titleFor={'maximum ' + titleFor}
        min={min}
        max={max}
        value={maxFocused
          ? maxNumber
          : maxValue}

        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) setMaxNumber(255);
          else setMaxNumber(value);
          setMaxNumber(value);
        }}
        onFocus={onMaxFocus}
        onBlur={(e) => {
          setMaxFocused(false);
          onMaxBlur(e);
        }}
        onIncrement={onMaxIncrement}
        onDecrement={onMaxDecrement}

        onLeft={false}
        width={3}
      />
    </div>
  )
}

export default DoubleSlider