import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import './LoadIcon.css';

type LoadIconProps = {
  opaque?: boolean
};

const LoadIcon = ({
  opaque = false,
}: LoadIconProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [diameter, setDiameter] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    if (wrapperRef.current) {
      const [wrapperWidth, wrapperHeight] = [wrapperRef.current.offsetWidth, wrapperRef.current.offsetHeight];
      setDiameter(Math.min(wrapperWidth, wrapperHeight) / 3);
    }
    else setDiameter(0);
  }, [wrapperRef, setDiameter, windowWidth, windowHeight, ]);
  return (
    <div
      ref={wrapperRef}
      className="load-icon__wrapper"
      style={{
        opacity: opaque ? 0.9 : '',
      }}
    >
      <div
        className="pokeball__wrapper"
        title="Loading..."
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