import {
  useState,
} from "react";
import { GenerationNum, ItemIconDatum, PokemonIconDatum, TypeIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from '../../../utils/smogonLogic';

import {
  CartAction,
  GenFilter,
  TeamAction,
} from "../../../hooks/app-hooks";

// Rendering lists
// #region

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  genFilter: GenFilter
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
  typeIconDatum?: TypeIconDatum
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  cartNote: string
}