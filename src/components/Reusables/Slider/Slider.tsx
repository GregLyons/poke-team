import { useState } from "react";
import NumericalInput from "../NumericalInput/NumericalInput";
import SliderBase from "./SliderBase";

import './Slider.css';

type SliderProps = {
  titleFor: string

  min: number
  max: number
  value: number

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onIncrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDecrement: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  
  onLeft?: boolean

  sliderWidth?: number | string
  numericalWidth?: number
}

const Slider = ({
  titleFor,

  min,
  max,
  value,
  onChange,
  onBlur,
  onIncrement,
  onDecrement,

  onLeft = true,
  sliderWidth = '150px',
  numericalWidth,
}: SliderProps) => {
  const [focused, setFocused] = useState(false);
  const [number, setNumber] = useState(max);

  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) setNumber(8);
    else setNumber(value);
    setFocused(true);
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