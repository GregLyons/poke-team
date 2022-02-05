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
  pulsing: boolean
}

export const DEFAULT_BACKGROUND: BGManager = {
  bgColor: BG_RED,
  classSuffix: '--red',
  pulsing: false,
}


export type BGAction = 
| {
    type: 'change',
    payload: 'red' | 'green' | 'blue',
  }
| {
    type: 'toggle_pulse',
  }

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

    case 'toggle_pulse':
      return {
        ...state,
        pulsing: !state.pulsing,
      }

    default:
      throw new Error();
  }
};

export function toggleBGPulse(dispatchBGManager: React.Dispatch<BGAction>) {
  dispatchBGManager({
    type: 'toggle_pulse',
  });
  setTimeout(() => {
    dispatchBGManager({
      type: 'toggle_pulse',
    });
  }, 500);
}

export function classWithBG (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg${bgManager.classSuffix}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `;
}

export function classWithBGShadow (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-shadow${bgManager.classSuffix}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `;
}

export function classWithBGAfter (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-after${bgManager.classSuffix}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `;
}