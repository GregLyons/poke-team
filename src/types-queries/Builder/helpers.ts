import { NameEdge } from "../helpers";

export interface EnablesItemEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    psID: string
  }
};

export interface RequiresItemEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    psID: string
  }
};

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
    psID: edge.node.psID,
    formClass: edge.class,
  };
}
