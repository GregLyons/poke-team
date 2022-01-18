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
}

const PokemonIcon = ({
  dispatchCart,
  dispatchTeam,
  key,
  pokemonIconDatum,
}: PokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div
      className="planner__pokemon-icon"
      title={`Icon for the Pokemon ${pokemonIconDatum.formattedName}`}
      key={key}
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}              
    />
  );
};

export default PokemonIcon;