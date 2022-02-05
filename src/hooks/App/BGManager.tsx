export type BGColor = {
  red: number
  green: number
  blue: number
};

export const BG_RED = {
  red: 255,
  green: 0,
  blue: 0,
}

export const BG_GREEN = {
  red: 0,
  green: 255,
  blue: 0,
}

export const BG_BLUE = {
  red: 0,
  green: 0,
  blue: 255,
}

export type Background = {
  bgColor: BGColor
}

export type BackgroundAction = 
| {
    type: 'change'
  }

export function bgReducer(state: Background, action: BackgroundAction) {

}