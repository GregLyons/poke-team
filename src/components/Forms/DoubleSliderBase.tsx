import { useCallback, useEffect, useRef, useState } from "react";
import { PokemonFilterAction } from "../../hooks/app-hooks";
import './Forms.css';

type DoubleSliderBaseProps = {
  min: number
  minValue: number
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  
  max: number
  maxValue: number
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  sliderWidth: number | string
}

// Based on https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1
const DoubleSliderBase = ({
  min,
  minValue,
  onMinChange,
  max,
  maxValue,
  onMaxChange,
  sliderWidth,
}: DoubleSliderBaseProps) => {
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxValue);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  return (
    <div 
      className="container"
      style={{
        width: sliderWidth,
      }}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        ref={minValRef}
        onChange={onMinChange}
        className={minValue > max - 100 
          ? "thumb thumb--zindex-5"
          : "thumb thumb--zindex-3"
        }
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        ref={maxValRef}
        onChange={onMaxChange}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
      </div>
    </div>
  );
};

export default DoubleSliderBase;