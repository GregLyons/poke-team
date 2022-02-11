import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { PokemonIconFilters } from "../../components/App";

/*
  Functionality for entries in the planner expanding on hover. We distinguish between 'entryHover' and 'expandHover'. 'entryHover' refers to when the user hovers over anywhere in the entry. This will, e.g. cause entry name to expand. On the other hand, 'expandHover' refers to when the user hovers over specified areas of the entry (e.g. Pokemon icons, data column), which will cause the entry to expand to accomodate any overflowing content.

  We distinguish between the two, since a user may simply wish to hit 'SELECT ALL' and 'SAVE TO BOX' on an entry and then move on. By the time this operation completes, the expandTimer would have passed, and the entry would expand. Then, when they wish to do the same for another entry, the contracting of the previous entry would move the position of their current entry, making it harder to click on. This, we only expand the entry when the mouse position of the user suggests they wish to interact more with the entry. 

  On the other hand, once the entry is expanded, we don't want it to contract if the user remains in the entry (e.g. after selecting icons and then going to 'SAVE TO BOX'). Thus, we will set the entry to contract back to its original height after the user's mouse leaves the entire entry.

  In summary, the behavior we want is:
    The entry expands if the user lingers in an area of the entry which potentially requires expanding (data, description, icons).
    The entry contracts only once the user leaves the entry, assuming that it has already expanded.

  Once the entry expands to its scroll height, its scroll height then increases slightly. Thus, if we modify our selection, the component will re-render with the new, slightly increased scroll height, and the effect is that the height increases slightly whenever we click on a selection. 
  
  Thus, for the in-line style, we set the expand-height equal to the *original* scroll height.

  The one caveat is that we need to also update the scroll height whenever one of the following changes:
    - The window dimensions (shrinking the window leads to more rows, which should increase the scroll height)
    - The various filters (gen, tier, Pokemon), as they change the number of icons present.
*/
export const useEntryExpand = (
  entryRef: React.RefObject<HTMLDivElement>,
  filters?: PokemonIconFilters
) => {
  const [originalScrollHeight, setOriginalScrollHeight] = useState<null|number>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [entryHover, setEntryHover] = useState(false);
  const [expandHover, setExpandHover] = useState(false);
  const [expand, setExpand] = useState(false);
  const expandTimer = useRef<NodeJS.Timeout>();
  const contractTimer = useRef<NodeJS.Timeout>();

  // Needs to run on window resize as well. 
  useEffect(() => {
    setTimeout(() => entryRef.current && setOriginalScrollHeight(entryRef.current.scrollHeight));
  }, [entryRef, setOriginalScrollHeight, windowWidth, windowHeight, filters?.genFilter, filters?.pokemonFilter, filters?.tierFilter]);

  function onMouseEnterEntry() {
    // Clear contract timer upon entering entry; the purpose of this is so that if the user accidentally exits an expanded entry, the entry won't close on them if they reenter the entry in time. 
    if (contractTimer.current) {
      // Clear contractTimer to stop contracting
      clearTimeout(contractTimer.current);
      // Keeps expand progress bar alive, assuming already expanded
      if (expand) setExpandHover(true);
    }
    setEntryHover(true);
  }

  function onMouseLeaveEntry() {
    setEntryHover(false);
  }

  // Set 'hover' immediately, set 'expand' after the user hovers for a certain amount of time
  // Time is connected to CSS variable --expand-time
  function onMouseEnterIcon() {
    setExpandHover(true);
    // Only expand if there is overflow in the element
    if (entryRef.current && entryRef.current.offsetHeight < entryRef.current.scrollHeight) expandTimer.current = setTimeout(() => setExpand(true), 500);
    // Stop contract timer
    if (contractTimer.current) clearTimeout(contractTimer.current);
  }

  // Set 'hover' immediately, set 'expand' after the mouse has left for a certain amount of time
  // Time is connected to CSS variable --expand-time
  function onMouseLeaveIcon() {
    setExpandHover(false);
    // Stop expand timer
    if (expandTimer.current) clearTimeout(expandTimer.current);
    // If expanded, start contract timer
    if (expand) contractTimer.current = setTimeout(() => setExpand(false), 500);
  }

  const hoverListeners = { onMouseEnter: onMouseEnterEntry, onMouseLeave: onMouseLeaveEntry }
  const expandListeners = { onMouseEnter: onMouseEnterIcon, onMouseLeave: onMouseLeaveIcon, }

  return { entryHover, expandHover, expand, hoverListeners, expandListeners, originalScrollHeight};
}
