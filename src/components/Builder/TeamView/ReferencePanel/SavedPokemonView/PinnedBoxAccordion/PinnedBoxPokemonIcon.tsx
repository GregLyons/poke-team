import { PokemonIconDatum } from "../../../../../../types-queries/helpers";
import { getPokemonIcon } from "../../../../../../utils/sprites";

type PinnedBoxPokemonIconProps = {
  onPokemonSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
  pokemonIconDatum: PokemonIconDatum
}

const PinnedBoxPokemonIcon = ({
  onPokemonSelect,
  pokemonIconDatum,
}: PinnedBoxPokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <div className="pinned-box__pokemon-icon-container"
      style={{
        width: '50px',
        height: '30px',
        display: 'inline-block',
      }}
    > 
      <div className="pinned-box__pokemon-icon-track" />
      <div className="pinned-box__pokemon-icon-background"
        style={{
          width: '40px',
          height: '30px',
          borderRadius: '40%',
          transition: 'background-color 0.2s',
          opacity: '0.8',
        }}
      />
      <button
        className="pinned-box__pokemon-icon"
        onClick={e => onPokemonSelect(e, pokemonIconDatum)}
        title={`Select ${pokemonIconDatum.formattedName}.`}
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

export default PinnedBoxPokemonIcon;