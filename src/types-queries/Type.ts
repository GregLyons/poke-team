import {
  gql,
} from '@apollo/client';
import {
  EntitySearchQueryName,
  MainEntitySearchResult,
  EntitySearchVars,
  MainEntityInSearch,
  
  EntityPageQueryName,
  MainEntityOnPage,
  MainEntityPageResult,
  EntityPageVars,
  CountField,
  
  MainToAuxConnectionEdge,
  EntityConnectionVars,
  MainToAuxConnectionOnPage,

  TypeNameEdge,
  AbilityIconEdge,
  MoveIconEdge,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  NameEdge,
  VersionDependentDescription,
  DescriptionEdge,
  VersionDependentDescriptionEdge,
  AuxToMainConnectionEdge,
  AuxEntityInSearch,
  AuxEntitySearchResult,
  AuxEntityPageResult,
  AuxEntityOnPage,
  AuxToMainConnectionOnPage,
  AuxToAuxConnectionEdge,
  AuxToAuxConnectionOnPage,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';
import {
  DescriptionsEdge,
} from './Description';

// Type names
// #region

export type TypeName = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy';

export const typeNameEdgeToTypeName: (edge: TypeNameEdge) => TypeName = edge => edge.node.name;

// #endregion

// Type in main search
// #region

export type TypeSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: TypeSearchResult[]
}

export interface TypeSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string

  defensiveMatchups: {
    edges: TypeMatchupEdge[]
  }

  offensiveMatchups: {
    edges: TypeMatchupEdge[]
  }

  pokemon: {
    edges: PokemonIconEdge[]
  }
}

export interface TypeMatchupEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string
    description: string
  }
  multiplier: number
}

export interface TypeSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const TYPE_SEARCH_QUERY = gql`
  query TypeSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    types(
      generation: $gen
      filter: { startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      defensiveMatchups {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }

      offensiveMatchups {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }

      pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
        edges {
          node {
            id
            name
            formattedName
            pokemonShowdownID
            introduced {
              edges {
                node {
                  id
                  number
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type TypeMatchups = {
  [type in TypeName]: number
}

const typeResultToMatchups = (edges: TypeMatchupEdge[]): TypeMatchups => {
  const matchups = {
    'normal': 1,
    'fighting': 1,
    'flying': 1,
    'poison': 1,
    'ground': 1,
    'rock': 1,
    'bug': 1,
    'ghost': 1,
    'steel': 1,
    'fire': 1,
    'water': 1,
    'grass': 1,
    'electric': 1,
    'psychic': 1,
    'ice': 1,
    'dragon': 1,
    'dark': 1,
    'fairy': 1,
  }

  for (let edge of edges) {
    matchups[edge.node.name] = edge.multiplier;
  }

  return matchups;
}

export class TypeInSearch extends AuxEntityInSearch {
  public pokemonIconData: PokemonIconDatum[]
  public defensiveMatchups: TypeMatchups
  public offensiveMatchups: TypeMatchups

  constructor(gqlType: TypeSearchResult) {
    super(gqlType);

    this.pokemonIconData = gqlType.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.defensiveMatchups = typeResultToMatchups(gqlType.defensiveMatchups.edges);
    this.offensiveMatchups = typeResultToMatchups(gqlType.offensiveMatchups.edges);
  }
}

// #endregion

// Type page
// #region

export type TypePageQuery = {
  [pageQueryName in EntityPageQueryName]?: TypePageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface TypePageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  defensiveMatchups: {
    edges: TypeMatchupEdge[]
  }

  offensiveMatchups: {
    edges: TypeMatchupEdge[]
  }

  boostedByAbility: CountField
  boostedByFieldState: CountField
  boostedByItem: CountField
  enablesMove: CountField
  ignoresFieldState: CountField
  moves: CountField
  naturalGift: CountField
  removesFieldState: CountField
  resistedByAbility: CountField
  resistedByFieldState: CountField
  resistedByItem: CountField
  resistsFieldState: CountField
  weatherBall: CountField
}

export interface TypePageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const TYPE_PAGE_QUERY = gql`
  query TypePageQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      name
      formattedName

      introduced {
        edges {
          node {
            number
          }
        }
      }

      defensiveMatchups {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }

      offensiveMatchups {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }

      boostedByAbility {
        count
      }
      boostedByFieldState {
        count
      }
      boostedByItem {
        count
      }
      enablesMove {
        count
      }
      ignoresFieldState {
        count
      }
      moves {
        count
      }
      naturalGift {
        count
      }
      removesFieldState {
        count
      }
      resistedByAbility {
        count
      }
      resistedByFieldState {
        count
      }
      resistedByItem {
        count
      }
      resistsFieldState {
        count
      }
      weatherBall {
        count
      }
    }
  }
`;

export class TypeOnPage extends AuxEntityOnPage {
  public defensiveMatchups: TypeMatchups
  public offensiveMatchups: TypeMatchups

  public boostedByAbilityCount: number
  public boostedByFieldStateCount: number
  public boostedByItemCount: number
  public enablesMoveCount: number
  public ignoresFieldStateCount: number
  public moveCount: number
  public naturalGiftCount: number
  public removesFieldStateCount: number
  public resistedByAbilityCount: number
  public resistedByFieldStateCount: number
  public resistedByItemCount: number
  public resistsFieldStateCount: number
  public weatherBallCount: number

  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number

  constructor(gqlType: TypePageResult) {
    super(gqlType);

    // Type matchups
    this.defensiveMatchups = typeResultToMatchups(gqlType.defensiveMatchups.edges);
    this.offensiveMatchups = typeResultToMatchups(gqlType.offensiveMatchups.edges);

    // Counts for displaying accordions
    this.boostedByAbilityCount = gqlType.boostedByAbility.count;
    this.boostedByFieldStateCount = gqlType.boostedByFieldState.count;
    this.boostedByItemCount = gqlType.boostedByItem.count;
    this.enablesMoveCount = gqlType.enablesMove.count;
    this.ignoresFieldStateCount = gqlType.ignoresFieldState.count;
    this.moveCount = gqlType.moves.count;
    this.naturalGiftCount = gqlType.naturalGift.count;
    this.removesFieldStateCount = gqlType.removesFieldState.count;
    this.resistedByAbilityCount = gqlType.resistedByAbility.count;
    this.resistedByFieldStateCount = gqlType.resistedByFieldState.count;
    this.resistedByItemCount = gqlType.resistedByItem.count;
    this.resistsFieldStateCount = gqlType.resistsFieldState.count;
    this.weatherBallCount = gqlType.weatherBall.count;

    this.abilityCount = this.boostedByAbilityCount + this.resistedByAbilityCount;
    this.fieldStateCount = this.boostedByFieldStateCount + this.ignoresFieldStateCount + this.removesFieldStateCount + this.resistedByFieldStateCount + this.resistsFieldStateCount + this.weatherBallCount;
    this.itemCount = this.boostedByItemCount + this.naturalGiftCount + this.resistedByItemCount;
    this.moveCount = this.enablesMoveCount + this.moveCount;
  }
}

// #endregion

// Type connections
// #region

// TypeAbility
// #region

export type TypeAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostedByAbility: {
      edges: TypeAbilityEdge[]
    }
    resistedByAbility: {
      edges: TypeAbilityEdge[]
    }
  }[]
}

export interface TypeAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
  multiplier: number
}

export interface TypeAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_ABILITY_QUERY = gql`
  query TypeAbilitiesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

                  introduced {
                    edges {
                      node {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
          multiplier
        }
      }
      resistedByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

                  introduced {
                    edges {
                      node {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
          multiplier
        }
      }
    }
  }
`;

export class TypeAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public multiplier: number

  constructor(gqlTypeAbility: TypeAbilityEdge) {
    super(gqlTypeAbility);

    const { multiplier, } = gqlTypeAbility;
    this.multiplier = multiplier;

    this.pokemonIconData = gqlTypeAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// TypeFieldState
// #region

export type TypeFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostedByFieldState: {
      edges: TypeFieldStateEdge[]
    }
    ignoresFieldState: {
      edges: TypeFieldStateEdge[]
    }
    removesFieldState: {
      edges: TypeFieldStateEdge[]
    }
    resistedByFieldState: {
      edges: TypeFieldStateEdge[]
    }
    resistsFieldState: {
      edges: TypeFieldStateEdge[]
    }
    weatherBall: {
      edges: TypeFieldStateEdge[]
    }
  }[]
}

export interface TypeFieldStateEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  multiplier?: number
}

export interface TypeFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_FIELDSTATE_QUERY = gql`
  query TypeAbilitiesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
          multiplier
        }
      }
      ignoresFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
        }
      }
      removesFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
        }
      }
      resistedByFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
          multiplier
        }
      }
      resistsFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
          multiplier
        }
      }
      weatherBall {
        edges {
          node {
            id
            name
            formattedName

            description
          }
        }
      }
    }
  }
`;

export class TypeFieldStateResult extends AuxToAuxConnectionOnPage {
  public multiplier?: number

  constructor(gqlTypeFieldState: TypeFieldStateEdge) {
    super(gqlTypeFieldState);

    const { multiplier, } = gqlTypeFieldState;
    this.multiplier = multiplier;
  }
}

// #endregion

// TypeItem
// #region

export type TypeItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostedByItem: {
      edges: TypeItemEdge[]
    }
    naturalGift: {
      edges: TypeItemEdge[]
    }
    resistedByItem: {
      edges: TypeItemEdge[]
    }
  }[]
}

export interface TypeItemEdge extends AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }
  }
  multiplier?: number
  power?: number
}

export interface TypeItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_ITEM_QUERY = gql`
  query TypeItemsQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByItem {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }
          }
          multiplier
        }
      }
      naturalGift {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }
          }
          power
        }
      }
      resistedByItem {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }
          }
          multiplier
        }
      }
    }
  }
`;

export class TypeItemResult extends AuxToMainConnectionOnPage {
  public multiplier?: number
  public power?: number

  constructor(gqlTypeItem: TypeItemEdge) {
    super(gqlTypeItem);

    const { multiplier, power, } = gqlTypeItem;
    this.multiplier = multiplier;
    this.power = power;
  }
}

// #endregion

// TypeMove
// #region

export type TypeMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    enablesMove: {
      edges: TypeMoveEdge[]
    }
    moves: {
      edges: TypeMoveEdge[]
    }
  }[]
}

export interface TypeMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }

    type: {
      edges: TypeNameEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface TypeMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_MOVE_QUERY = gql`
  query TypeMovesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      enablesMove {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

                  introduced {
                    edges {
                      node {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      moves {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

                  introduced {
                    edges {
                      node {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class TypeMoveResult extends AuxToMainConnectionOnPage {
  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlTypeMove: TypeMoveEdge) {
    super(gqlTypeMove);

    this.type = gqlTypeMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlTypeMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion