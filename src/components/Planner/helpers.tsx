import { IconDatum, PokemonIconDatum, TypeIconDatum } from "../../types-queries/helpers";
import { Dispatches, Filters } from "../App";

// Rendering lists
// #region

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
  // Pokemon icons displayed, when relevant, on the right side of the entry
  pokemonIconData?: PokemonIconDatum[]
  linkIconDatum?: LinkIconDatum
  dispatches?: Dispatches
  filters?: Filters
  cartNote?: string
}

// Icons displayed on the left sider of the entry under the page link
export type LinkIconDatum = {
  iconClass: 'type'
  iconDatum: TypeIconDatum
} | {
  iconClass: 'item' | 'fieldState' | 'stat' | 'status' | 'usageMethod'
  iconDatum: IconDatum
};

// #endregion

// Filtering
// #region

// Dropdowns
export function listToggleValue<SearchVars extends { [Property in keyof SearchVars]: any }, ValueType> (
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  key: keyof SearchVars,
) {
  // Type-check
  return (value: ValueType) => {
    if (!(queryVars[key] as ValueType[])) {
      console.log('Incorrect key passed:', key, value);
      return;
    }
  
    // Value is already selected, so toggle it off
    if ((queryVars[key] as ValueType[]).includes(value)) {
      setQueryVars({
        ...queryVars,
        [key]: (queryVars[key] as ValueType[]).filter(d => d !== value),
      })
    }
    // Otherwise, toggle it on
    else setQueryVars({
      ...queryVars,
      [key]: (queryVars[key] as ValueType[]).concat([value]),
    });
  }
}

// Sliders
export function sliderSelect<SearchVars extends { [Property in keyof SearchVars]: any }> (
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  key: keyof SearchVars,
) {
  // Type-check
  if ((queryVars[key] as number) === undefined) {
    console.log('Incorrect key passed:', key);
    return;
  }
  const updateValue = (value: number) => setQueryVars({
    ...queryVars,
    [key]: value,
  });

  return { updateValue };
}

// Double sliders
export function rangeSelect<SearchVars extends { [Property in keyof SearchVars]: any }> (
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  minKey: keyof SearchVars,
  maxKey: keyof SearchVars,
) {
  // Type-check
  if ((queryVars[minKey] as number) === undefined) {
    console.log('Incorrect min key passed:', minKey);
    return;
  }
  if ((queryVars[maxKey] as number) === undefined) {
    console.log('Incorrect max key passed:', maxKey);
    return;
  }

  const updateMinValue = (value: number) => setQueryVars({
    ...queryVars,
    [minKey]: value,
  });
  
  const updateMaxValue = (value: number) => setQueryVars({
    ...queryVars,
    [maxKey]: value,
  });

  return { updateMinValue, updateMaxValue, };
}

// #endregion