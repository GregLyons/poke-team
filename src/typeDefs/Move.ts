import { GenerationNum, IntroductionEdge } from './Generation.js';
import { TypeName } from './Type.js';

type TypeEdge = { node: { name: TypeName }}
type PokemonEdge = { node: { 
  name: string 
  formattedName: string
  speciesName: string

  introduced: {
    edges: IntroductionEdge[]
  }
}}

export interface MoveGQLResult {
  id: string

  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  accuracy: number
  category: string
  contact: boolean
  power: number
  pp: number
  priority: number
  target: string

  type: {
    edges: TypeEdge[]
  }

  pokemon: {
    edges: PokemonEdge[]
  }
}


// 
export class Move {
  public id: string

  public name: string
  public formattedName: string

  public introduced: GenerationNum

  public accuracy: number
  public category: string
  public contact: boolean
  public power: number
  public pp: number
  public priority: number
  public target: string

  public type: TypeName

  public pokemon: {
    name: string
    formattedName: string
    speciesName: string

    introduced: GenerationNum
  }[]

  constructor(
    gqlMove: MoveGQLResult
  ) {
    this.id = gqlMove.id;

    this.name = gqlMove.name;
    this.formattedName = gqlMove.formattedName;
    
    this.accuracy = gqlMove.accuracy;
    this.category = gqlMove.category;
    this.contact = gqlMove.contact;
    this.power = gqlMove.power;
    this.pp= gqlMove.pp;
    this.priority = gqlMove.priority;
    this.target = gqlMove.target;

    this.introduced = gqlMove.introduced.edges[0].node.number;

    this.type = gqlMove.type.edges.map(edge => edge.node.name)[0];

    this.pokemon = gqlMove.pokemon.edges.map(edge => {
      return {
        name: edge.node.name,
        formattedName: edge.node.formattedName,
        speciesName: edge.node.speciesName,

        introduced: edge.node.introduced.edges[0].node.number
      };
    });
  }
}

