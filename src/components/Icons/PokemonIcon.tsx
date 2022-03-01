import { GenderName } from "../../types-queries/Builder/MemberPokemon";
import { PokemonIconDatum } from "../../types-queries/helpers"
import { getPokemonIcon } from "../../utils/sprites";

import './Icons.css';

type PokemonIconProps = {
  pokemonIconDatum: PokemonIconDatum
  gender?: GenderName
}

const PokemonIcon = ({
  pokemonIconDatum,
  gender,
}: PokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum, gender);

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