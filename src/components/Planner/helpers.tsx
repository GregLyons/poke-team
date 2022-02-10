import { GenFilter } from "../../hooks/App/GenFilter";
import { IconDatum, ItemIconDatum, PokemonIconDatum, TypeIconDatum } from "../../types-queries/helpers";
import { PokemonIconDispatches, PokemonIconFilters } from "../App";

// Rendering lists
// #region

export type ListRenderArgsIcons<SearchQuery> = {
  data: SearchQuery
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
}

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  genFilter: GenFilter
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
  pokemonIconData?: PokemonIconDatum[]
  linkIconDatum?: LinkIconDatum
  dispatches?: PokemonIconDispatches
  filters?: PokemonIconFilters
  cartNote?: string
}

export type LinkIconDatum = {
  iconClass: 'item'
  iconDatum: ItemIconDatum
} | {
  iconClass: 'type'
  iconDatum: TypeIconDatum
} | {
  iconClass: 'fieldState' | 'stat' | 'status' | 'usageMethod'
  iconDatum: IconDatum
};