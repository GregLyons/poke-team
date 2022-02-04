import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { GenFilter } from "../App/GenFilter";
import { PokemonFilter } from "../App/PokemonFilter";
import { TierFilter } from "../App/TierFilter";

/* 
  Once the entry expands to its scroll height, its scroll height then increases slightly. Thus, if we modify our selection, the component will re-render with the new, slightly increased scroll height, and the effect is that the height increases slightly whenever we click on a selection. 
  
  Thus, for the in-line style, we set the expand-height equal to the *original* scroll height.

  The one caveat is that we need to also update the scroll height whenever one of the following changes:
    - The window dimensions (shrinking the window leads to more rows, which should increase the scroll height)
    - The various filters (gen, tier, Pokemon), as they change the number of icons present.
*/
export const useEntryExpand = (
  entryRef: React.RefObject<HTMLDivElement>,
  genFilter?: GenFilter,
  tierFilter?: TierFilter,
  pokemonFilter?: PokemonFilter
) => {
  const [originalScrollHeight, setOriginalScrollHeight] = useState<null|number>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(false);
  const expandTimer = useRef<NodeJS.Timeout>();
  const contractTimer = useRef<NodeJS.Timeout>();

  // Needs to run on window resize as well. 
  useEffect(() => {
    setTimeout(() => entryRef.current && setOriginalScrollHeight(entryRef.current.scrollHeight));
  }, [entryRef, setOriginalScrollHeight, windowWidth, windowHeight, genFilter, tierFilter, pokemonFilter]);

  // Set 'hover' immediately, set 'expand' after the user hovers for a certain amount of time
  // Time is connected to CSS variable --expand-time
  function onMouseEnter() {
    setHover(true);
    // Only expand if there is overflow in the element
    if (entryRef.current && entryRef.current.offsetHeight < entryRef.current.scrollHeight) expandTimer.current = setTimeout(() => setExpand(true), 500);
    // Stop contract timer
    if (contractTimer.current) clearTimeout(contractTimer.current);
  }

  // Set 'hover' immediately, set 'expand' after the mouse has left for a certain amount of time
  // Time is connected to CSS variable --expand-time
  function onMouseLeave() {
    setHover(false);
    // Stop expand timer
    if (expandTimer.current) clearTimeout(expandTimer.current);
    // If expanded, start contract timer
    if (expand) contractTimer.current = setTimeout(() => setExpand(false), 500);
  }

  const expandListeners = { onMouseEnter, onMouseLeave, }

  return {hover, expand, expandListeners, originalScrollHeight};
}
