import { useEffect, useRef, useState } from "react";

/* 
  Once the entry expands to its scroll height, its scroll height then increases slightly. Thus, if we modify our selection, the component will re-render with the new, slightly increased scroll height, and the effect is that the height increases slightly whenever we click on a selection. 
  
  Thus, for the in-line style, we set the expand-height equal to the *original* scroll height.


*/
export const useEntryExpand = (entryRef: React.RefObject<HTMLDivElement>) => {
  const [originalScrollHeight, setOriginalScrollHeight] = useState<null|number>(null);
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(false);
  const expandTimer = useRef<NodeJS.Timeout>();
  const contractTimer = useRef<NodeJS.Timeout>();

  // Will only run once the entry is rendered
  useEffect(() => {
    if (entryRef.current) setOriginalScrollHeight(entryRef.current.scrollHeight)
  }, [entryRef, setOriginalScrollHeight]);

  // Set 'hover' immediately, set 'expand' after the user hovers for a certain amount of time
  function onMouseEnter() {
    setHover(true);
    // Only expand if there is overflow in the element
    if (entryRef.current && entryRef.current.offsetHeight < entryRef.current.scrollHeight) expandTimer.current = setTimeout(() => setExpand(true), 300);
    // Stop contract timer
    if (contractTimer.current) clearTimeout(contractTimer.current);
  }

  // Set 'hover' immediately, set 'expand' after the mouse has left for a certain amount of time
  function onMouseLeave() {
    setHover(false);
    // Stop expand timer
    if (expandTimer.current) clearTimeout(expandTimer.current);
    // If expanded, start contract timer
    if (expand) contractTimer.current = setTimeout(() => setExpand(false), 300);
  }

  const expandListeners = { onMouseEnter, onMouseLeave, }

  return {hover, expand, expandListeners, originalScrollHeight};
}
