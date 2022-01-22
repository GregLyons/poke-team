import {
  useEffect,
  useReducer,
  useState,
} from "react"
import { CartAction } from "../components/App";
import { PokemonIconDatum } from "../types-queries/helpers";

/* 
  Once the entry expands to its scroll height, its scroll height then increases slightly. Thus, if we modify our selection, the component will re-render with the new, slightly increased scroll height, and the effect is that the height increases slightly whenever we click on a selection. 
  
  Thus, for the in-line style, we set the expand-height equal to the *original* scroll height.
*/
export const useEntryExpand = (entryRef: React.RefObject<HTMLDivElement>) => {
  const [originalScrollHeight, setOriginalScrollHeight] = useState<null|number>(null);

  // Will only run once the entry is rendered
  useEffect(() => {
    if (entryRef.current) setOriginalScrollHeight(entryRef.current.scrollHeight)
  }, [entryRef, setOriginalScrollHeight]);

  return originalScrollHeight;
}

export const useSelection = (iconData: PokemonIconDatum[] | undefined): [Selection, React.Dispatch<SelectionAction>] => {
  const initialSelection = iconData
  ? iconData.reduce((acc: Selection, curr) => {
    const { psID, name, formattedName, introduced } = curr;
    if (acc[curr.psID]) return acc;

    return {
      ...acc,
      [curr.psID]: {
        nameData: {
          psID,
          name,
          formattedName,
          introduced,
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
              introduced: 1,
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