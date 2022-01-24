import {
  NUMBER_OF_GENS,
} from '../utils/constants';

// Generations
// #region

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

// #endregion

// Icons
// #region

// Pokemon icons
// #region

export type PokemonIconDatum = {
  formattedName: string
  name: string
  psID: string
  introduced: GenerationNum
}

export const DUMMY_POKEMON_ICON_DATUM: PokemonIconDatum = {
  formattedName: '',
  name: '',
  psID: '',
  introduced: 1,
};

export const pokemonIconEdgeToPokemonIconDatum: (edge: PokemonIconEdge) => PokemonIconDatum = (edge) => {
  return {
    formattedName: edge.node.formattedName,
    name: edge.node.name,
    psID: edge.node.pokemonShowdownID,
    introduced: edge.node.introduced.edges[0].node.number,
  };
}

// #endregion

// Item icons
// #region

export type ItemIconDatum = {
  name: string
  formattedName: string
  introduced: GenerationNum
}

export const itemIconEdgeToItemIconDatum: (edge: ItemIconEdge) => ItemIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
    introduced: edge.node.introduced.edges[0].node.number,
  };
}

export const itemRequiresPokemonEdgeToRequiredPokemonIconData: (itemEdge: ItemRequiresPokemonEdge) => PokemonIconDatum[] = (itemEdge) => {
  return itemEdge.node.requiresPokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
}

// #endregion

// Type icons
// #region 

export type TypeIconDatum = {
  name: TypeName
  formattedName: string
  introduced: GenerationNum
}

export const typeIconEdgeToTypeIconDatum: (edge: TypeIconEdge) => TypeIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
    introduced: edge.node.introduced.edges[0].node.number,
  };
}

// #endregion

// #endregion

// Elemental types
// #region

export type TypeName = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy';

export const typeNameEdgeToTypeName: (edge: TypeNameEdge) => TypeName = edge => edge.node.name;

// #endregion

// Edges for queries
// #region

export type Edge = { node: any }

// Names
// #region

// Name data to be received from query
export interface NameEdge extends Edge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

// Ensures name received is a valid type name
export interface TypeNameEdge extends NameEdge {
  node: { 
    id: string
    name: TypeName
    formattedName: string
  }
};

// #endregion

// Descriptions
// #region

// For entities with non-version-group dependent descriptions
export interface DescriptionEdge extends Edge {
  node: {
    description: string
  }
}

// For entities with version-group dependent descriptions
export type DescriptionsEdge = {
  node: {
    text: string
  }
  versionGroupCode: string
};

// #endregion

// For determining when an entity was introduced
export interface IntroductionEdge extends Edge {
  node: {
    number: GenerationNum
  }
};

// Icon edges
// #region

// Ability edges which contain data for rendering Pokemon icons
export interface AbilityIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

// Item edges which contain data for rendering item icons
export interface ItemIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
}

// Item edges which contain data for rendering icons for Pokemon which the item requires
export interface ItemRequiresPokemonEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }

    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

// Move edges which contain data for rendering Type icons and Pokemon icons
export interface MoveIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    type: {
      edges: TypeNameEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

// Pokemon edges which contain data for rendering Pokemon icons
// pokemonShowdownID for using @pkmn/img
export interface PokemonIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    pokemonShowdownID: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
}

// Type edges which contain data for rendering both Type icons and Pokemon icons
// TypeName instead of string
export interface TypeIconEdge extends NameEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }

    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
}

// #endregion

// #endregion