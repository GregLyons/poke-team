import { useCallback, useEffect, useRef } from "react";

type DoubleSliderBaseProps = {
  titleFor: string

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
  titleFor,

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
      className="double-slider__container"
      style={{
        width: sliderWidth,
      }}
    >
      <input
        title={`Modify minimum ${titleFor}`}
        type="range"
        min={min}
        max={max}
        value={minValue}
        ref={minValRef}
        onChange={onMinChange}
        className={minValue > max - 100 
          ? "double-slider__thumb double-slider__thumb --zindex-5"
          : "double-slider__thumb double-slider__thumb --zindex-3"
        }
      />
      <input
        title={`Modify maximum ${titleFor}`}
        type="range"
        min={min}
        max={max}
        value={maxValue}
        ref={maxValRef}
        onChange={onMaxChange}
        className="double-slider__thumb double-slider__thumb --zindex-4"
      />

      <div className="double-slider">
        <div className="double-slider__track" />
        <div ref={rangeRef} className="double-slider__range" />
      </div>
    </div>
  );
};

export default DoubleSliderBase;