import { BaseStatName, IntroductionEdge, NameEdge, StatTable, toAbbreviatedBaseStatName } from "../helpers";

// Formatting spreads 
// #region

export const spreadSummary = (spread: StatTable, defaultValue: number) => {
  let result: string = '';

  for (let [key, value] of Object.entries(spread)) {
    // Typeguard
    const statName = (key as BaseStatName);
    if (!statName) continue;
    if (value !== defaultValue) {
      result += value + ' ' + toAbbreviatedBaseStatName(statName) + ' / ';
    }
  }

  return result.slice(0, -2);
}

// #endregion

// Item requirements
// #region

export interface EnablesItemEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    psID: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
};

export interface RequiresItemEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    psID: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
};

// #endregion

// Forms
// #region

export interface PokemonFormEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    speciesName: string
    psID: string
  }
  class: string
}

export type PokemonFormDatum = {
  id: string
  name: string
  formattedName: string
  speciesName: string
  psID: string

  formClass: string
}

export const pokemonFormEdgeToFormDatum: (edge: PokemonFormEdge) => PokemonFormDatum = edge => {
  return {
    ...edge.node,
    formClass: edge.class,
  };
}

// #endregion