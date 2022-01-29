import { Pokemon } from "../../types-queries/Planner/Pokemon";


export type Team = Pokemon[];
export type TeamAction = 
| { type: 'add', payload: Pokemon, }
| { type: 'remove', payload: number, }

export function teamReducer(state: Team, action: TeamAction) {
  switch(action.type) {
    case 'add':
      return [
        ...state,
        action.payload,
      ];
    case 'remove':
      return state.filter((d, i) => i !== action.payload);
    default:
      throw new Error();
  }
}
