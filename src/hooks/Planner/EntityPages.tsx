import { useState } from "react";
import { EntityPageVars } from "../../types-queries/Planner/helpers";


export function entityConnectionChangeHandler<QueryVars>(setQueryVars: React.Dispatch<React.SetStateAction<QueryVars>>): (x: QueryVars) => void {
  return setQueryVars;
}

export function useEntityConnectionChangeHandler<QueryVars extends EntityPageVars>(defaultQueryVars: QueryVars): [QueryVars, (newQueryVars: QueryVars) => void] {
  const [queryVars, setQueryVars] = useState<QueryVars>(defaultQueryVars);
  
  return [queryVars, entityConnectionChangeHandler<QueryVars>(setQueryVars)];
}