import { PokemonIconDatum } from "../../../../types-queries/helpers";
import { PokemonIconDispatches, PokemonIconFilters } from "../../../App";

type PinnedBoxProps = {
  pokemon: PokemonIconDatum[]
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  key: string
}

const PinnedBox = ({

}: PinnedBoxProps) => {
  return (
    <div>yo</div>
  )
};

export default PinnedBox;