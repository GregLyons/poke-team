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
      title={`Icon for ${pokemonIconDatum.formattedName}`}
      key={key}
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/icons/pokemonicons-sheet.png'})`,
        backgroundPosition: `${left}px ${top}px`,
        backgroundRepeat: 'no-repeat',
      }}              
    />
  );
};

export default PokemonIcon;