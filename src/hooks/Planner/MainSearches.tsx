import { SetStateAction, useEffect, useState } from "react";
import { GenFilter, removedFromBDSP, removedFromSwSh } from "../App/GenFilter";


export function useGenConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [SearchVars, React.Dispatch<SetStateAction<SearchVars>>] {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);

  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
    });
  }, [genFilter]);

  return [queryVars, setQueryVars];
}

export function useRemovalConnectedSearchVars<SearchVars>(defaultSearchVars: SearchVars, genFilter: GenFilter): [SearchVars, React.Dispatch<SetStateAction<SearchVars>>] {
  const [queryVars, setQueryVars] = useState<SearchVars>(defaultSearchVars);
  
  useEffect(() => {
    setQueryVars({
      ...queryVars,
      gen: genFilter.gen,
      removedFromSwSh: removedFromSwSh(genFilter),
      removedFromBDSP: removedFromBDSP(genFilter),
    })
  }, [genFilter]);

  return [queryVars, setQueryVars];
}
