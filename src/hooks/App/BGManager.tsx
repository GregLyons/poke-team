export type BGColor = 'red' | 'green' | 'blue' | 'none';

export type BGManager = {
  bgColor: BGColor
  pulsing: boolean
}

export const DEFAULT_BACKGROUND: BGManager = {
  bgColor: 'none',
  pulsing: false,
}


export type BGAction = 
| {
    type: 'change',
    payload: 'red' | 'green' | 'blue' | 'none',
  }
| {
    type: 'toggle_pulse',
  }

export function bgReducer(state: BGManager, action: BGAction) {
  switch(action.type) {
    case 'change':
      return {
        ...state,
        bgColor: action.payload,
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
    bg --${bgManager.bgColor}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `.replaceAll(/\n/g, '');
}

export function classWithBGShadow (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-shadow --${bgManager.bgColor}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `.replaceAll(/\n/g, ' ');
}

export function classWithBGControl (className: string, color: BGColor): string {
  return `
    ${className}
    bg-control --${color}
  `.replaceAll(/\n/g, ' ');
}

export function classWithBGAfter (className: string, bgManager: BGManager): string {
  return `
    ${className}
    bg-after --${bgManager.bgColor}
    ${bgManager.pulsing
      ? 'pulse' 
      : ''
    }
  `.replaceAll(/\n/g, ' ');
}