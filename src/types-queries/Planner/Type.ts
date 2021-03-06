import {
  gql
} from '@apollo/client';
import { GenNum } from '../entities';
import {
  AbilityIconEdge,
  FormattedTypeName,
  IntroductionEdge,
  MoveIconEdge, PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  toFormattedTypeName,
  TypeIconDatum,
  typeIconEdgeToTypeIconDatum,
  TypeName, TypeNameEdge,
  typeNameEdgeToTypeName
} from '../helpers';
import {
  AuxEntityOnPage, AuxEntityPageResult, AuxToAuxConnectionEdge, AuxToIconConnectionEdge,
  AuxToIconConnectionOnPage, AuxToItemConnectionEdge,
  AuxToItemConnectionOnPage, AuxToMainConnectionEdge, AuxToMainConnectionOnPage, CountField,

  EntityConnectionVars, EntityPageQueryName,
  EntityPageVars, EntitySearchVars, RemovedFromGameQueryVars, VersionDependentDescriptionEdge
} from './helpers';

// Type in main search
// #region

export type TypeSearchQuery = {
  types: {
    count: number
    edges: TypeSearchResult[]
  }
}

export interface TypeSearchResult {
  node: {
    id: string
    name: TypeName
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
  
    pokemon: {
      edges: PokemonIconEdge[]
    }
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

export interface TypeSearchVars extends EntitySearchVars, RemovedFromGameQueryVars {
  gen: GenNum

  limit: number
  offset: number

  contains: string
  startsWith: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const TYPE_SEARCH_QUERY = gql`
  query TypeSearchQuery($gen: Int!
    $limit: Int! $offset: Int!
    $contains: String $startsWith: String
    $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    types(
      generation: $gen
      filter: { contains: $contains, startsWith: $startsWith }
      pagination: { limit: $limit, offset: $offset }
    ) {
      id
      count
      edges {
        node {
          id
          name
          formattedName

          introduced {
            id
            edges {
              node {
                number
              }
            }
          }

          defensiveMatchups {
            id
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
            id
            edges {
              node {
                id
                name
                formattedName
              }
              multiplier
            }
          }

          pokemon(filter: {
            formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
            removedFromSwSh: $removedFromSwSh,
            removedFromBDSP: $removedFromBDSP,
          }) {
            id
            edges {
              node {
                id
                formattedName
                psID

                removedFromSwSh
                removedFromBDSP

                typeNames

                baseStats {
                  id
                  hp
                  attack
                  defense
                  specialAttack
                  specialDefense
                  speed
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

export class TypeInSearch {
  public name: TypeName
  public formattedName: FormattedTypeName

  public pokemonIconData: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  public defensiveMatchups: TypeMatchups
  public offensiveMatchups: TypeMatchups

  constructor(gqlType: TypeSearchResult) {
    this.name = gqlType.node.name;
    this.formattedName = toFormattedTypeName(gqlType.node.name);

    this.pokemonIconData = gqlType.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum({node: gqlType.node});

    this.defensiveMatchups = typeResultToMatchups(gqlType.node.defensiveMatchups.edges);
    this.offensiveMatchups = typeResultToMatchups(gqlType.node.offensiveMatchups.edges);
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
  weakenedByFieldState: CountField
  resistedByItem: CountField
  resistsFieldState: CountField
  weatherBall: CountField
}

export interface TypePageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const TYPE_PAGE_QUERY = gql`
  query TypePageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      name
      formattedName

      introduced {
        id
        edges {
          node {
            number
          }
        }
      }

      defensiveMatchups {
        id
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
        id
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
        id
        count
      }
      boostedByFieldState {
        id
        count
      }
      boostedByItem {
        id
        count
      }
      enablesMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      ignoresFieldState {
        id
        count
      }
      moves(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      naturalGift {
        id
        count
      }
      removesFieldState {
        id
        count
      }
      resistedByAbility {
        id
        count
      }
      weakenedByFieldState {
        id
        count
      }
      resistedByItem {
        id
        count
      }
      resistsFieldState {
        id
        count
      }
      weatherBall {
        id
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
  public naturalGiftCount: number
  public removesFieldStateCount: number
  public resistedByAbilityCount: number
  public weakenedByFieldStateCount: number
  public resistedByItemCount: number
  public resistsFieldStateCount: number
  public weatherBallCount: number
  
  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number
  public moveInteractionCount: number

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
    this.moveInteractionCount = gqlType.moves.count;
    this.naturalGiftCount = gqlType.naturalGift.count;
    this.removesFieldStateCount = gqlType.removesFieldState.count;
    this.resistedByAbilityCount = gqlType.resistedByAbility.count;
    this.weakenedByFieldStateCount = gqlType.weakenedByFieldState.count;
    this.resistedByItemCount = gqlType.resistedByItem.count;
    this.resistsFieldStateCount = gqlType.resistsFieldState.count;
    this.weatherBallCount = gqlType.weatherBall.count;

    this.abilityCount = this.boostedByAbilityCount + this.resistedByAbilityCount;
    this.fieldStateCount = this.boostedByFieldStateCount + this.ignoresFieldStateCount + this.removesFieldStateCount + this.weakenedByFieldStateCount + this.resistsFieldStateCount + this.weatherBallCount;
    this.itemCount = this.boostedByItemCount + this.naturalGiftCount + this.resistedByItemCount;
    this.moveInteractionCount = this.enablesMoveCount;
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

export interface TypeAbilityQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const TYPE_ABILITY_QUERY = gql`
  query TypeAbilitiesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByAbility {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
                  }
                }
              }
            }
          }
          multiplier
        }
      }
      resistedByAbility {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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
    weakenedByFieldState: {
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

export interface TypeFieldStateEdge extends AuxToIconConnectionEdge, AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  multiplier?: number
}

export interface TypeFieldStateQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const TYPE_FIELDSTATE_QUERY = gql`
  query TypeAbilitiesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByFieldState {
        id
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
        id
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
        id
        edges {
          node {
            id
            name
            formattedName

            description
          }
        }
      }
      weakenedByFieldState {
        id
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
        id
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
        id
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

export class TypeFieldStateResult extends AuxToIconConnectionOnPage {
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

export interface TypeItemEdge extends AuxToItemConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }

    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
  multiplier?: number
  power?: number
}

export interface TypeItemQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const TYPE_ITEM_QUERY = gql`
  query TypeItemsQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      boostedByItem {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
                  }
                }
              }
            }
          }
          multiplier
        }
      }
      naturalGift {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
                  }
                }
              }
            }
          }
          power
        }
      }
      resistedByItem {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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

export class TypeItemResult extends AuxToItemConnectionOnPage {
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

export interface TypeMoveQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const TYPE_MOVE_QUERY = gql`
  query TypeMovesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    typeByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      enablesMove(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP
      }) {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              id
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              id
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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