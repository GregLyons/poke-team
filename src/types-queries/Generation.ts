import {
  NUMBER_OF_GENS,
} from '../utils/constants';
import {
  Edge
} from './helpers';

export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const stringToGenNumber = (value: string | null): GenerationNum => {
  if (value === null) return NUMBER_OF_GENS;
  else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(value)) {
    return parseInt(value, 10) as GenerationNum;
  }
  else {
    return NUMBER_OF_GENS;
  }
}

export interface IntroductionEdge extends Edge {
  node: {
    number: GenerationNum
  }
};