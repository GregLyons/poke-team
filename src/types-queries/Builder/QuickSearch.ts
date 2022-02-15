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
}

export const POKEMON_QUICKSEARCH_QUERY = gql`
  query PokemonSearchQuery($gen: Int! $contains: String!
  $removedFromBDSP: Boolean $removedFromSwSh: Boolean) {
    pokemon(
      generation: $gen,
      filter: {
        formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
        contains: $contains, 
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP,
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
