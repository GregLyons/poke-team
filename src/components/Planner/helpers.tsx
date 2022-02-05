
// Rendering lists
// #region

import { BGAction } from "../../hooks/App/BGManager";
import { CartAction } from "../../hooks/App/Cart";
import { GenFilter } from "../../hooks/App/GenFilter";
import { PokemonFilter } from "../../hooks/App/PokemonFilter";
import { TeamAction } from "../../hooks/App/Team";
import { TierFilter } from "../../hooks/App/TierFilter";
import { ItemIconDatum, PokemonIconDatum, TypeIconDatum } from "../../types-queries/helpers";

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
  dispatchBGManager?: React.Dispatch<BGAction>
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
  dispatchBGManager: React.Dispatch<BGAction>
}