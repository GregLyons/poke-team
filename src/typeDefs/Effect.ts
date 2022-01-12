import { GenerationNum, IntroductionEdge } from './Generation.js';

type MoveEdge = { node: { 
  name: string 
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }
}}

export interface EffectGQLResult {
  id: string

  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  moves: {
    edges: MoveEdge[]
  }
}


// 
export class Effect {
  public id: string

  public name: string
  public formattedName: string

  public introduced: GenerationNum

  public moves: {
    name: string
    formattedName: string

    introduced: GenerationNum
  }[]

  constructor(
    gqlEffect: EffectGQLResult
  ) {
    this.id = gqlEffect.id;

    this.name = gqlEffect.name;
    this.formattedName = gqlEffect.formattedName;

    this.introduced = gqlEffect.introduced.edges[0].node.number;

    this.moves = gqlEffect.moves.edges.map(edge => {
      return {
        name: edge.node.name,
        formattedName: edge.node.formattedName,

        introduced: edge.node.introduced.edges[0].node.number
      };
    });
  }
}

