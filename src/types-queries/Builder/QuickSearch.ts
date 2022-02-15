import { gql } from "@apollo/client";
import { EnumTypeName, GenerationNum, NameEdge, PokemonIconDatum, PokemonIconNode, pokemonIconNodeToPokemonIconDatum, StatTable, TypeName } from "../helpers";

export type PokemonQuickSearchQuery = {
  pokemon: PokemonQuickSearchResult[]
}

export interface PokemonQuickSearchResult extends PokemonIconNode {
  id: string
  name: string
  formattedName: string
  speciesName: string
  pokemonShowdownID: string
  typeNames: EnumTypeName[]
  baseStats: StatTable
}

export interface PokemonAbilityEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface PokemonQuickSearchVars {
  gen: GenerationNum
  contains: string

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
    $gen: Int! $contains: String!
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
        contains: $contains, 
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
      name
      formattedName
      speciesName
      pokemonShowdownID

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
      }
    }
  }
`;
 
export class QuickSearchPokemon {
  public pokemonIconDatum: PokemonIconDatum

  constructor(gqlPokemon: PokemonQuickSearchResult) {
    this.pokemonIconDatum = pokemonIconNodeToPokemonIconDatum(gqlPokemon);
  }
}
