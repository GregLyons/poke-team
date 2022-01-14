import {
  useState,
} from "react";

import {
  CartAction,
  TeamAction,
} from "../../App";

export type ListRenderArgs<SearchQuery> = {
  data: SearchQuery
  dispatchCart?: React.Dispatch<CartAction>
  dispatchTeam?: React.Dispatch<TeamAction>
}

export class MissingDispatchError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingDispatchError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingDispatchError);
    }

    this.name='MissingDispatchError';
  }
}

export function entityConnectionChangeHandler<QueryVars>(setQueryVars: React.Dispatch<React.SetStateAction<QueryVars>>): (x: QueryVars) => void {
  return setQueryVars;
}

export function useEntityConnectionChangeHandler<QueryVars>(defaultQueryVars: QueryVars): [QueryVars, (newQueryVars: QueryVars) => void] {
  const [queryVars, setQueryVars] = useState<QueryVars>(defaultQueryVars);
  
  return [queryVars, entityConnectionChangeHandler<QueryVars>(setQueryVars)];
}