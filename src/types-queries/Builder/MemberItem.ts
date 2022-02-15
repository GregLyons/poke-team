import { EnablesItemEdge, RequiresItemEdge } from "./helpers"

export type MemberItem = {
  name: string
  formattedName: string
  psID: string
  description: string
}

// TODO: psID
export const enablesItemEdgeToMemberItem: (edge: EnablesItemEdge) => MemberItem = edge => {
  return {
    ...edge.node,
    psID: edge.node.name,
    description: 'yo',
  }
}

// TODO: psID
export const requiresItemEdgeToMemberItem: (edge: RequiresItemEdge) => MemberItem = edge => {
  return {
    ...edge.node,
    psID: edge.node.name,
    description: 'yo',
  }
}