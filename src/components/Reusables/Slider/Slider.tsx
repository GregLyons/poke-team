import { useState } from "react";
import NumericalInput from "../NumericalInput/NumericalInput";
import './Slider.css';
import SliderBase from "./SliderBase";

type SliderProps = {
  titleFor: string

  min: number
  max: number
  value: number
  step?: number

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
  step = 1,

  updateValue,

  onLeft = true,
  sliderWidth = '150px',
  numericalWidth,
}: SliderProps) => {
  const [focused, setFocused] = useState(false);
  const [number, setNumber] = useState<number | ''>(max);

  // Change handled by slider, so min/max constraints already enforced
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(+e.target.value);
  }

  // When focusing input window, changing value updates number instead of value; value is only updated upon blurring
  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    else setNumber(value);
    setFocused(true);
  }

  // When blurring focus window, value is updated based on what is in input window
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) updateValue(value - (value % step));
  }

  // When up arrow is pressed, increase value by 1 if possible
  const onIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    // If value would go over max, do nothing
    if (value + step > max) return;
    updateValue(value + step);
  }

  // When down arrow is pressed, decrease value by 1 if possible
  const onDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    
    // If value would go under min, do nothing
    if (value - step < min) return;
    updateValue(value - step);
  }

  return (
    <div className="slider__wrapper">
      {onLeft && 
        <>
          <label htmlFor={titleFor.replace(/\s/g, '-') + '_numerical_input'}  className="hidden-label">Number input for {titleFor}</label>
          <NumericalInput
            titleFor={titleFor.replace(/\s/g, '-')}
            min={min}
            max={max}
            value={focused 
              ? number
              : value}
            onChange={(e) => {
              const strValue = e.target.value.length > 0 
                ? e.target.value
                : ''
              const value = parseInt(strValue, 10);
              if (isNaN(value)) setNumber('');
              else setNumber(value);
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
          />
        </>
      }
      <SliderBase
        titleFor={titleFor}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
        sliderWidth={sliderWidth}
      />
      {!onLeft && <>
        <label htmlFor={titleFor.replace(/\s/g, '-') + '_numerical_input'}  className="hidden-label">Number input for {titleFor}</label>
        <NumericalInput
          titleFor={titleFor}
          min={min}
          max={max}
          value={focused 
            ? number
            : value}
  
          onChange={(e) => {
            const strValue = e.target.value.length > 0 
              ? e.target.value
              : ''
            const value = parseInt(strValue, 10);
            if (isNaN(value)) setNumber('');
            else setNumber(value);
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
        />
      </>}
    </div>
  )
}

export default Slider;