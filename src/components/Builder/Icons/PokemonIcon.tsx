import { PokemonIconDatum } from "../../../types-queries/helpers"
import { getPokemonIcon } from "../../../utils/sprites";

import './Icons.css';

type PokemonIconProps = {
  pokemonIconDatum: PokemonIconDatum
}

const PokemonIcon = ({
  pokemonIconDatum,
}: PokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div
      className="pokemon-icon"
      title={pokemonIconDatum.formattedName}
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}
    />
  )
}

export default PokemonIcon;