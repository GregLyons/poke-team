import { gql } from "@apollo/client";
import { GenNum, StatTableWithBST } from "../entities";
import { CapsTypeName, NameEdge, PokemonColumnName, PokemonIconDatum, PokemonIconNode, pokemonIconNodeToPokemonIconDatum, SortByEnum } from "../helpers";

export type PokemonQuickSearchQuery = {
  pokemon: {
    count: number
    edges: PokemonQuickSearchResult[]
  }
}

export interface PokemonQuickSearchResult extends PokemonIconNode {
  node: {
    id: string
    name: string
    formattedName: string
    speciesName: string
    psID: string
    typeNames: CapsTypeName[]
    baseStats: StatTableWithBST

    removedFromSwSh: boolean
    removedFromBDSP: boolean
  }
}

export interface PokemonAbilityEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface PokemonQuickSearchVars {
  gen: GenNum

  limit: number
  offset: number
  orderBy: PokemonColumnName
  sortBy: SortByEnum
  

  contains: string
  startsWith: string

  removedFromSwSh: false | null
  removedFromBDSP: false | null

  types: CapsTypeName[]

  maxHP: number
  minHP: number
  maxAttack: number
  minAttack: number
  maxDefense: number
  minDefense: number
  maxSpecialAttack: number
  minSpecialAttack: number
  maxSpecialDefense: number
  minSpecialDefense: number
  maxSpeed: number
  minSpeed: number
}

export const POKEMON_QUICKSEARCH_QUERY = gql`
  query PokemonSearchQuery(
    $gen: Int!

    $limit: Int! $offset: Int!, $orderBy: PokemonColumnName!, $sortBy: SortByEnum!

    $contains: String $startsWith: String
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
    $maxHP: Int $minHP: Int
    $maxAttack: Int $minAttack: Int
    $maxDefense: Int $minDefense: Int
    $maxSpecialAttack: Int $minSpecialAttack: Int
    $maxSpecialDefense: Int $minSpecialDefense: Int
    $maxSpeed: Int $minSpeed: Int
    $types: [TypeName!]!
  ) {
    pokemon(
      generation: $gen,
      filter: {
        # Bring in battle forms
        formClass: [ALOLA, BASE, BATTLE, GALAR, GMAX, HISUI, MEGA, OTHER],
        contains: $contains, startsWith: $startsWith, 
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP,
        maxHP: $maxHP,
        minHP: $minHP,
        maxAttack: $maxAttack,
        minAttack: $minAttack,
        maxDefense: $maxDefense
        minDefense: $minDefense
        maxSpecialAttack: $maxSpecialAttack,
        minSpecialAttack: $minSpecialAttack,
        maxSpecialDefense: $maxSpecialDefense,
        minSpecialDefense: $minSpecialDefense,
        maxSpeed: $maxSpeed,
        minSpeed: $minSpeed,
        types: $types
      }
      pagination: {
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        sortBy: $sortBy
      }
    ) {
      id
      count
      edges {
        node {
          id
          name
          formattedName
          speciesName
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
            baseStatTotal
          }
        }
      }
    }
  }
`;
 
export class QuickSearchPokemonEntry {
  public pokemonIconDatum: PokemonIconDatum
  public baseStatTotal: number

  constructor(gqlPokemon: PokemonQuickSearchResult) {
    this.pokemonIconDatum = pokemonIconNodeToPokemonIconDatum(gqlPokemon.node);
    this.baseStatTotal = gqlPokemon.node.baseStats.baseStatTotal;
  }
}
