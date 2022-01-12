import { DocumentNode } from "graphql";
import { TypeName } from "./Type";

export type TypeEdge = { node: { name: TypeName }};

export type Edge = { node: DocumentNode }