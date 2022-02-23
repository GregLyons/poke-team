import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const useContainerSize = (headerRef: React.RefObject<HTMLElement>, navBarRef: React.RefObject<HTMLDivElement>) => {
  const windowSize = useWindowSize();
  const [containerWidth, setContainerWidth] = useState('');
  const [containerHeight, setContainerHeight] = useState('');
  const [contentHeight, setContentHeight] = useState('');

  useEffect(() => {
    if (headerRef.current && navBarRef.current) {
      setContainerWidth(`${headerRef.current.scrollWidth}px`);

      // Using offset height for headerRef since its scrollHeight can change due to dropdowns
      setContainerHeight(`calc(${windowSize.height}px - ${headerRef.current.offsetHeight}px) - ${navBarRef.current.offsetHeight}px`);

      setContentHeight(`calc(${windowSize.height}px - ${headerRef.current.offsetHeight}px - ${2 * navBarRef.current.offsetHeight}px)`); 
    
    }
  }, [windowSize, headerRef, navBarRef, ]);

  return [containerWidth, containerHeight, contentHeight];
}