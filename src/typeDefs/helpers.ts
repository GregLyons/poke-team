import { DocumentNode } from "graphql";
import {
  PokemonIconDatum,
  PokemonIconEdge,
} from "./Pokemon";
import { TypeName } from "./Type";

export type TypeEdge = { node: { name: TypeName }};

export type Edge = { node: any }