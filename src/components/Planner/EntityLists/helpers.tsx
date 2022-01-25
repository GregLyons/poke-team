import {
  useState,
} from "react";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from "../../../utils/constants";

import {
  CartAction,
  TeamAction,
} from "../../App";

// Rendering lists
// #region

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter?: TierFilter
}

export class MissingDispatchError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingDispatchError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingDispatchError);
    }

    this.name='MissingDispatchError';
  }
}

export class MissingGenError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingGenError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingGenError);
    }

    this.name='MissingGenError';
  }
}

export class MissingTierFilterError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingTierFilterError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingTierFilterError);
    }

    this.name='MissingTierFilterError';
  }
}

export function entityConnectionChangeHandler<QueryVars>(setQueryVars: React.Dispatch<React.SetStateAction<QueryVars>>): (x: QueryVars) => void {
  return setQueryVars;
}

export function useEntityConnectionChangeHandler<QueryVars>(defaultQueryVars: QueryVars): [QueryVars, (newQueryVars: QueryVars) => void] {
  const [queryVars, setQueryVars] = useState<QueryVars>(defaultQueryVars);
  
  return [queryVars, entityConnectionChangeHandler<QueryVars>(setQueryVars)];
}

// #endregion

export type EntryIconData = {
  pokemonIconData: PokemonIconDatum[]
  itemIconDatum?: ItemIconDatum
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
  cartNote: string
}