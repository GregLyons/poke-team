import {
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { PokemonIconDatum } from "../types-queries/helpers";
import { GenFilter, removedFromBDSP, removedFromSwSh } from "./app-hooks";

// Main searches
// #region

export function useGenConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [SearchVars, React.Dispatch<SetStateAction<SearchVars>>] {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);

  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
    });
  }, [genFilter]);

  return [queryVars, setQueryVars];
}

export function useRemovalConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [SearchVars, React.Dispatch<SetStateAction<SearchVars>>] {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);
  
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    })
  }, [genFilter]);

  return [queryVars, setQueryVars];
}

// #endregion

// Entries
// #region

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

// #endregion

// Selecting
// #region

export const useSelection = (iconData: PokemonIconDatum[] | undefined): [Selection, React.Dispatch<SelectionAction>] => {
  const initialSelection = iconData
  ? iconData.reduce((acc: Selection, curr) => {
    const { psID, name, formattedName, } = curr;
    if (acc[curr.psID]) return acc;

    return {
      ...acc,
      [curr.psID]: {
        nameData: {
          psID,
          name,
          formattedName,
        },
        selected: false,
      }
    };
  }, {})
  : null;

  const [selection, dispatchSelection] = useReducer(selectionReducer, initialSelection 
      ? initialSelection 
      : {
          dummy: {
            nameData: { 
              formattedName: '',
              psID: '',
              name: '',
            },
            selected: false,
          }
        }
    );

  return [selection, dispatchSelection];
}

// Keys are psIDs
export type Selection = {
  [key: string]: {
    nameData: PokemonIconDatum,
    selected: boolean,
  }
}

export const selectionToPokemonIconData = (selection: Selection): PokemonIconDatum[] => {
  const iconData = Object.keys(selection).reduce((acc: PokemonIconDatum[], curr: string) => {
    if (selection[curr].selected) return acc.concat(selection[curr].nameData);
    else return acc;
  }, [])

  return iconData;
}

export type SelectionAction = 
| { type: 'toggle', payload: string }
| { type: 'add_all' }
| { type: 'remove_all' }

const selectionReducer = (selection: Selection, action: SelectionAction): Selection => {
  switch(action.type) {
    case 'toggle':
      return {
        ...selection,
        [action.payload]: {
          nameData: selection[action.payload].nameData,
          selected: !selection[action.payload].selected,
        }
      };

    case 'add_all':
      return Object.keys(selection).reduce((newSelection: Selection, psID: string) => {
        return {
          ...newSelection,
          [psID]: {
            nameData: selection[psID].nameData,
            selected: true,
          }
        }
      }, {});
    
    case 'remove_all':
      return Object.keys(selection).reduce((newSelection: Selection, psID: string) => {
        return {
          ...newSelection,
          [psID]: {
            nameData: selection[psID].nameData,
            selected: false,
          }
        }
      }, {});
    default:
      throw new Error();
  }
}

// #endregion