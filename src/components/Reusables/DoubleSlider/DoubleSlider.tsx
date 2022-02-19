import { useState } from "react";
import DoubleSliderBase from "./DoubleSliderBase"
import './DoubleSlider.css';
import NumericalInput from "../NumericalInput/NumericalInput";

type DoubleSliderProps = {
  titleFor: string

  min: number
  minValue: number
  updateMinValue: (newMinValue: number) => void


  max: number
  maxValue: number
  updateMaxValue: (newMaxValue: number) => void

  sliderWidth?: number | string
}

const DoubleSlider = ({
  titleFor,

  min,
  minValue,
  updateMinValue,
  
  max,
  maxValue,
  updateMaxValue,

  sliderWidth = '200px',
}: DoubleSliderProps) => {
  const [minFocused, setMinFocused] = useState(false);
  const [minNumber, setMinNumber] = useState(min);
  const [maxFocused, setMaxFocused] = useState(false);
  const [maxNumber, setMaxNumber] = useState(255);

  // Min handling 
  // #region

  // Checks that newValue is a valid minimum, updates minValue accordingly, and updates maxValue if necessary
  const updateMinIntermediate = (newValue: number) => {
    // For number entry, NaN may be returned, so reset to default min
    // If newValue is smaller than min, reset to default min
    if (isNaN(newValue) || newValue < min || newValue > max) return updateMinValue(min);
    
    // If minValue would go over maxValue, increase maxValue to compensate
    if (newValue > maxValue) {
      updateMinValue(newValue);
      updateMaxValue(newValue);
    }
    // Only update minValue
    else updateMinValue(newValue);
  }

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => updateMinIntermediate(parseInt(e.target.value, 10));

  const onMinIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => updateMinIntermediate(minValue + 1);

  const onMinDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => updateMinIntermediate(minValue - 1);

  // When focusing on NumericalInput, changes don't update minValue, but update minNumber instead; otherwise e.g. you can't backspace a 1-character entry, as that would give empty text box, resetting to default min
  const onMinFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setMinNumber(0);
    else setMinNumber(value);
    setMinFocused(true);
  }

  // Blurring NumericalInput updates minValue to minNumber
  const onMinBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => updateMinIntermediate(parseInt(e.target.value, 10));

  // #endregion

  // Max handling
  // #region

  // Checks that newValue is a valid maximum, updates maxValue accordingly, and updates minValue if necessary
  const updateMaxIntermediate = (newValue: number) => {
    // For number entry, NaN may be returned, so reset to default min
    // If newValue is invalid, reset to default max
    if (isNaN(newValue) || newValue > max || newValue < min) return updateMaxValue(max);
    
    // If maxValue would go under minValue, decrease minValue to compensate
    if (newValue < minValue) {
      updateMinValue(newValue);
      updateMaxValue(newValue);
    }
    // Only update minValue
    else updateMaxValue(newValue);
  }

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => updateMaxIntermediate(parseInt(e.target.value, 10));

  const onMaxIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => updateMaxIntermediate(maxValue + 1);

  const onMaxDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => updateMaxIntermediate(maxValue - 1);

  // When focusing on NumericalInput, changes don't update maxValue, but update maxNumber instead; otherwise e.g. you can't backspace a 1-character entry, as that would give empty text box, resetting to default max
  const onMaxFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setMaxNumber(255);
    else setMaxNumber(value);
    setMaxFocused(true);
  }

  // Blurring NumericalInput updates maxValue to maxNumber
  const onMaxBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => updateMaxIntermediate(parseInt(e.target.value, 10));

  // Update maxNumber so that value is reflected in input

  // #endregion
  
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