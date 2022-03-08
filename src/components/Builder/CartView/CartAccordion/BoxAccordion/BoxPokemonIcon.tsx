import { PokemonIconDatum } from "../../../../../types-queries/helpers";
import { getPokemonIcon } from "../../../../../utils/sprites";

type BoxPokemonIconProps = {
  pokemonIconDatum: PokemonIconDatum
}

const BoxPokemonIcon = ({
  pokemonIconDatum,
}: BoxPokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div className="planner__pokemon-icon-container"
      style={{
        width: '50px',
        height: '30px',
        display: 'inline-block',
      }}
    > 
      <div className="planner__pokemon-icon-track" />
      <div className="planner__pokemon-icon-background" 
        style={{
          width: '40px',
          height: '30px',
          borderRadius: '40%',
          transition: 'background-color 0.2s',
          opacity: '0.8',
        }}
      />
      <div
        className="planner__pokemon-icon"
        title={`${pokemonIconDatum.formattedName}`}
        style={{
          width: '40px',
          height: '30px',
          display: 'inline-block',
          backgroundPosition: `${left}px ${top}px`,
        }}              
      />
    </div>
  )

}

export default BoxPokemonIcon;