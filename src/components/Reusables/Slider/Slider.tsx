import { useState } from "react";
import NumericalInput from "../NumericalInput/NumericalInput";
import SliderBase from "./SliderBase";

import './Slider.css';

type SliderProps = {
  titleFor: string

  min: number
  max: number
  value: number

  updateValue: (newValue: number) => void
  
  onLeft?: boolean

  sliderWidth?: number | string
  numericalWidth?: number
}

const Slider = ({
  titleFor,

  min,
  max,
  value,

  updateValue,

  onLeft = true,
  sliderWidth = '150px',
  numericalWidth,
}: SliderProps) => {
  const [focused, setFocused] = useState(false);
  const [number, setNumber] = useState(max);

  // Change handled by slider, so min/max constraints already enforced
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(+e.target.value);
  }

  // When focusing input window, changing value updates number instead of value; value is only updated upon blurring
  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setNumber(8);
    else setNumber(value);
    setFocused(true);
  }

  // When blurring focus window, value is updated based on what is in input window
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) updateValue(value);
  }

  // When up arrow is pressed, increase value by 1 if possible
  const onIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // If value would go over max, do nothing
    if (value + 1 > max) return;
    updateValue(value + 1);
  }

  // When down arrow is pressed, decrease value by 1 if possible
  const onDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // If value would go under min, do nothing
    if (value - 1 < min) return;
    updateValue(value - 1);
  }


  return (
    <div className="slider__wrapper">
      {onLeft && <NumericalInput
        titleFor={titleFor}
        min={min}
        max={max}
        value={focused 
          ? number
          : value}
        onChange={(e) => {
          const strValue = e.target.value.length > 0 
            ? e.target.value.charAt(0)
            : ''
          const value = parseInt(strValue, 10);
          if (isNaN(value)) setNumber(8)
          else setNumber(value);
          setNumber(value);
        }}
        onFocus={onFocus}
        onBlur={(e) => {
          setFocused(false);
          onBlur(e);
        }}
        onIncrement={onIncrement}
        onDecrement={onDecrement}

        width={numericalWidth}
        onLeft={true}
      />}
      <SliderBase
        titleFor={titleFor}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        sliderWidth={sliderWidth}
      />
      {!onLeft && <NumericalInput
        titleFor={titleFor}
        min={min}
        max={max}
        value={focused 
          ? number
          : value}

        onChange={(e) => {
          const strValue = e.target.value.length > 0 
            ? e.target.value.charAt(0)
            : ''
          const value = parseInt(strValue, 10);
          if (isNaN(value)) setNumber(8)
          else setNumber(value);
          setNumber(value);
        }}
        onFocus={onFocus}
        onBlur={(e) => {
          setFocused(false);
          onBlur(e);
        }}
        onIncrement={onIncrement}
        onDecrement={onDecrement}

        width={numericalWidth}
        onLeft={false}
      />}
    </div>
  )
}

export default Slider;