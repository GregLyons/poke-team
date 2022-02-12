import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const useContainerHeight = (headerRef: React.RefObject<HTMLElement>, navBarRef: React.RefObject<HTMLDivElement>) => {
  const windowSize = useWindowSize();
  const [containerHeight, setContainerHeight] = useState('');
  const [contentHeight, setContentHeight] = useState('');

  useEffect(() => {
    if (headerRef.current && navBarRef.current) {
      setContainerHeight(`calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px)`);
      setContentHeight(`calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px - ${navBarRef.current.scrollHeight}px)`); 
    }
  }, [windowSize, headerRef, navBarRef, ]);

  return [containerHeight, contentHeight];
}