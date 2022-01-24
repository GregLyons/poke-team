import {
  Generations,
} from "@pkmn/data";
import {
  Dex,
} from "@pkmn/dex";
import {
  GenerationNum
} from "../types-queries/helpers";
import {
  SinglesTier,
} from "./constants";

const gens = new Generations(Dex);

export const psIDToTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier);
}