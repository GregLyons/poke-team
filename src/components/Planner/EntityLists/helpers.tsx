import {
  useState,
} from "react";
import { GenerationNum, ItemIconDatum, PokemonIconDatum, TypeIconDatum } from "../../../types-queries/helpers";
import { TierFilter } from '../../../utils/smogonLogic';

import {
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from "../../../hooks/app-hooks";
import { EntityPageVars } from "../../../types-queries/Planner/helpers";

// Rendering lists
// #region

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter?: TierFilter
  pokemonFilter?: PokemonFilter
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

export class MissingPokemonFilterError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingPokemonFilterError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingPokemonFilterError);
    }

    this.name='MissingPokemonFilterError';
  }
}

export type EntryIconData = {
  pokemonIconData: PokemonIconDatum[]
  itemIconDatum?: ItemIconDatum
  typeIconDatum?: TypeIconDatum
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  pokemonFilter: PokemonFilter
  genFilter: GenFilter
  tierFilter: TierFilter
  cartNote: string
}