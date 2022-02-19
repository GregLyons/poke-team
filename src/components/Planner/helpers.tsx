import { GenFilter } from "../../hooks/App/GenFilter";
import { IconDatum, ItemIconDatum, PokemonIconDatum, TypeIconDatum } from "../../types-queries/helpers";
import { Dispatches, Filters } from "../App";

// Rendering lists
// #region

export type ListRenderArgsIcons<SearchQuery> = {
  data: SearchQuery
  dispatches: Dispatches
  filters: Filters
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
  dispatches?: Dispatches
  filters?: Filters
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

export function sliderSelect<SearchVars extends { [Property in keyof SearchVars]: any }> (
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  min: number,
  max: number,
  key: keyof SearchVars,
) {

}

export function rangeSelect<SearchVars extends { [Property in keyof SearchVars]: any }> (
  queryVars: SearchVars,
  setQueryVars: React.Dispatch<React.SetStateAction<SearchVars>>,
  min: number,
  max: number,
  minKey: keyof SearchVars,
  maxKey: keyof SearchVars,
) {
  // Type-check
  if (!(queryVars[minKey] as number)) {
    console.log('Incorrect min key passed:', minKey);
    return;
  }
  if (!(queryVars[maxKey] as number)) {
    console.log('Incorrect max key passed:', maxKey);
    return;
  }

  const onMinIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    updateMin(queryVars[minKey] + 1);
  };

  const onMinDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    updateMin(queryVars[minKey] - 1);
  };

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) updateMin(min);
    else updateMin(value);
  };

  const onMinBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) updateMin(min);
    else updateMin(value);
  };

  const updateMin = (value: number) => {
    // Do nothing if value is less than hard min or greater than hard max
    if (value < min || value > max) return;
    // If new value less than max, only update min
    if (value < queryVars[maxKey]) {
      setQueryVars({
        ...queryVars,
        [minKey]: value,
      });
    }
    // If value greater than max, update min, and set new max = min
    else setQueryVars({
      ...queryVars,
      [minKey]: value,
      [maxKey]: value,
    });
  };

  const onMaxIncrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    updateMax(queryVars[maxKey] + 1);
  };

  const onMaxDecrement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    updateMax(queryVars[maxKey] - 1);
  };

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) updateMax(max);
    else updateMax(value);
  };

  const onMaxBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) updateMax(max);
    else updateMax(value);
  };

  const updateMax = (value: number) => {
    // Do nothing if value is less than hard min or greater than hard max
    if (value < min || value > max) return;
    // If new value less than max, only update min
    if (value > queryVars[minKey]) {
      setQueryVars({
        ...queryVars,
        [maxKey]: value,
      });
    }
    // If value greater than max, update min, and set new max = min
    else setQueryVars({
      ...queryVars,
      [minKey]: value,
      [maxKey]: value,
    });
  };

  return {
    onMinIncrement, onMinDecrement, onMinChange, onMinBlur, updateMin,
    onMaxIncrement, onMaxDecrement, onMaxChange, onMaxBlur, updateMax,
  };
}