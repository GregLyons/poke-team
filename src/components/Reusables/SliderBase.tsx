import { useCallback, useEffect, useRef, } from "react";

type SliderBaseProps = {
  min: number
  max: number

  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  sliderWidth: number | string
};

const SliderBase = ({
  min,
  max,
  value,
  onChange,
  sliderWidth
}: SliderBaseProps) => {
  const valRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100), 
    [min, max]
  );

  useEffect(() => {
    if (valRef.current) {
      const minPercent = getPercent(+valRef.current.value);
      
      if (rangeRef.current) {
        rangeRef.current.style.width = `${minPercent}%`;
      }
    }
  }, [value, getPercent])

  return (
    <div 
      className="slider__container"
      style={{
        width: sliderWidth,
      }}
    >
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        ref={valRef}
        onChange={onChange}
        step="1"
        className="slider__thumb"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
      </div>
    </div>
  )
}

export default SliderBase;