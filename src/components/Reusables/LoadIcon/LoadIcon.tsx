import { useEffect, useRef, useState } from 'react';
import './LoadIcon.css';

type LoadIconProps = {

};

const LoadIcon = ({

}: LoadIconProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [diameter, setDiameter] = useState(0);

  useEffect(() => {
    if (wrapperRef.current) {
      const [wrapperWidth, wrapperHeight] = [wrapperRef.current.offsetWidth, wrapperRef.current.offsetHeight];
      setDiameter(Math.min(wrapperWidth, wrapperHeight) / 3);
    }
    else setDiameter(0);
  }, [wrapperRef, setDiameter]);
  return (
    <div
      ref={wrapperRef}
      className="load-icon__wrapper"
      title="Loading..."
    >
      <div
        className="pokeball__wrapper"
        style={{
          width: diameter,
          height: diameter,
        }}
      >
        <div
          className="pokeball__center"
          style={{
            border: `${0.06 * diameter}px solid var(--dark2)`,
          }}
        >
          <div className="pokeball__button">
            
          </div>
        </div>
        <div className="pokeball__red">

        </div>
        <div
          className="pokeball__belt"
          style={{
            height: `${0.06 * diameter}px`
          }}
        >
          
        </div>
      </div>
    </div>
  );
};

export default LoadIcon;