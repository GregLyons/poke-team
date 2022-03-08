import { gql } from "@apollo/client";
import { GenNum, StatTableWithBST } from "../entities";
import { CapsTypeName, NameEdge, PokemonIconDatum, PokemonIconNode, pokemonIconNodeToPokemonIconDatum } from "../helpers";

export type PokemonQuickSearchQuery = {
  pokemon: {
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
  contains: string
  startsWith: string

  removedFromSwSh: false | null
  removedFromBDSP: false | null

  // maxHP: number
  // minHP: number
  // maxAttack: number
  // minAttack: number
  // maxDefense: number
  // minDefense: number
  // maxSpecialAttack: number
  // minSpecialAttack: number
  // maxSpecialDefense: number
  // minSpecialDefense: number
  // maxSpeed: number
  // minSpeed: number
}

export const POKEMON_QUICKSEARCH_QUERY = gql`
  query PokemonSearchQuery(
    $gen: Int! $contains: String $startsWith: String!
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
    # $maxHP: Int $minHP: Int
    # $maxAttack: Int $minAttack: Int
    # $maxDefense: Int $minDefense: Int
    # $maxSpecialAttack: Int $minSpecialAttack: Int
    # $maxSpecialDefense: Int $minSpecialDefense: Int
    # $maxSpeed: Int $minSpeed: Int
  ) {
    pokemon(
      generation: $gen,
      filter: {
        formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
        contains: $contains, startsWith: $startsWith, 
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP,
        # maxHP: $maxHP,
        # minHP: $minHP,
        # maxAttack: $maxAttack,
        # minAttack: $minAttack,
        # maxDefense: $maxDefense
        # minDefense: $minDefense
        # maxSpecialAttack: $maxSpecialAttack,
        # minSpecialAttack: $minSpecialAttack,
        # maxSpecialDefense: $maxSpecialDefense,
        # minSpecialDefense: $minSpecialDefense,
        # maxSpeed: $maxSpeed,
        # minSpeed: $minSpeed,
      }
    ) {
      id
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
 
export class QuickSearchPokemon {
  public pokemonIconDatum: PokemonIconDatum
  public baseStatTotal: number

  constructor(gqlPokemon: PokemonQuickSearchResult) {
    this.pokemonIconDatum = pokemonIconNodeToPokemonIconDatum(gqlPokemon.node);
    this.baseStatTotal = gqlPokemon.node.baseStats.baseStatTotal;
  }
}
