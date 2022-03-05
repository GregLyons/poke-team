import { PokemonIconDatum } from "../../types-queries/helpers"
import { GenderName } from "../../types-queries/Member/helpers";
import { getPokemonIcon } from "../../utils/sprites";

import './Icons.css';

type PokemonIconProps = {
  pokemonIconDatum: PokemonIconDatum
  gender?: GenderName
  planner?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const PokemonIcon = ({
  pokemonIconDatum,
  planner,
  gender,
  onClick,
}: PokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum, gender);

  return (
    <div
      className={`
        pokemon-icon icon
        ${planner
          ? 'planner__pokemon-icon'
          : ''
        }
      `}
      title={pokemonIconDatum.formattedName}
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
        backgroundPosition: `${left}px ${top}px`,
      }}
      onClick={onClick ? onClick : () => {}}
    />
  )
}

export default PokemonIcon;