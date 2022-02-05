export type BGColor = {
  red: number
  green: number
  blue: number
};

export type BGClassSuffix = '--red' | '--green' | '--blue';

export const BG_RED: BGColor = {
  red: 255,
  green: 0,
  blue: 0,
}

export const BG_GREEN: BGColor = {
  red: 161,
  green: 201,
  blue: 161,
}

export const BG_BLUE: BGColor = {
  red: 0,
  green: 0,
  blue: 255,
}

export type BGManager = {
  bgColor: BGColor
  classSuffix: BGClassSuffix
}

export const DEFAULT_BACKGROUND: BGManager = {
  bgColor: BG_RED,
  classSuffix: '--red'
}


export type BGAction = 
| {
    type: 'change'
    payload: 'red' | 'green' | 'blue'
  };

export function bgReducer(state: BGManager, action: BGAction) {
  switch(action.type) {
    case 'change':
      let newBGColor: BGColor;
      let newClassSuffix: BGClassSuffix;
      switch(action.payload) {
        case 'red':
          newBGColor = BG_RED;
          newClassSuffix = '--red';
          break;
        case 'green':
          newBGColor = BG_GREEN;
          newClassSuffix = '--green';
          break;
        case 'blue':
          newBGColor = BG_BLUE;
          newClassSuffix = '--blue';
          break;
      }
      return {
        ...state,
        bgColor: newBGColor,
        classSuffix: newClassSuffix,
      };

    default:
      throw new Error();
  }
};

export function classWithBG (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg${bgManager.classSuffix}
  `;
}

export function classWithBGShadow (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-shadow${bgManager.classSuffix}
  `;
}

export function classWithBGAfter (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-after${bgManager.classSuffix}
  `;
}