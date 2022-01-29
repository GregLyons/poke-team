import { useReducer } from "react";
import { PokemonIconDatum, psID } from "../../types-queries/helpers";

export const useSelection = (iconData: PokemonIconDatum[] | undefined): [Selection, React.Dispatch<SelectionAction>] => {
  const initialSelection = iconData
  ? iconData.reduce((acc: Selection, curr) => {
    const { psID, name, formattedName, typing, baseStats, } = curr;
    if (acc[curr.psID]) return acc;

    return {
      ...acc,
      [curr.psID]: {
        nameData: {
          psID,
          name,
          formattedName,
          typing,
          baseStats,
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
              typing: ['normal'],
              baseStats: {
                hp: -1,
                attack: -1,
                defense: -1,
                specialAttack: -1,
                specialDefense: -1,
                speed: -1,
              },
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