import {
  PokemonIconDatum,
} from "../types-queries/helpers";
import {
  getPokemonIcon,
} from "../utils/sprites";
import {
  CartAction,
  TeamAction,
} from "./App";

type PokemonIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  pokemonIconDatum: PokemonIconDatum
  selected: boolean
  toggleSelection: (psID: string) => void
}

const PokemonIcon = ({
  dispatchCart,
  dispatchTeam,
  key,
  pokemonIconDatum,
  selected,
  toggleSelection,
}: PokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div
      onClick={(e) => toggleSelection(pokemonIconDatum.psID)}
      className="planner__pokemon-icon"
      title={`Icon for the Pokemon ${pokemonIconDatum.formattedName}`}
      key={key}
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
        backgroundColor: selected ? 'green' : 'red',
      }}              
    />
  );
};

export default PokemonIcon;