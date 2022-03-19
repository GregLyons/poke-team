import { PokemonIconDatum } from "../../../../../types-queries/helpers";
import { getPokemonIcon } from "../../../../../utils/sprites";
import RemoveTimer from "./RemoveTimer";

type TeamMemberIconProps = {
  pokemonIconDatum: PokemonIconDatum
  removing: boolean
  removeDuration: number
  startTime: number | undefined
}

const TeamMemberIcon = ({
  pokemonIconDatum,
  removing,
  removeDuration,
  startTime,
}: TeamMemberIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  return (
    <button
      className="team-member__pokemon-icon-container"
    >
      {startTime &&
        <RemoveTimer
          removing={removing}
          removeDuration={removeDuration}
          startTime={startTime}
        />}
      <div 
        className="team-member__track"
        style={{
          opacity: removing
            ? 0
            : 0.8,
          transition: removing
            ? 'opacity ' + removeDuration + 'ms ease'
            : '',
        }}
      />
      <div
        className="team-member__pokemon-icon"
        title={`Modify ${pokemonIconDatum.formattedName}.`}
        style={{
          width: '40px',
          height: '30px',
          display: 'block',
          backgroundPosition: `${left}px ${top}px`,
          transform: removing 
            ? 'scale(0.05)'
            : 'scale(1)',
          transition: removing
            ? 'transform ' + removeDuration + 'ms ease'
            : '',
            // : replaceDuration + 'ms ease-in-out',
        }}              
      />
    </button>
  );
};

export default TeamMemberIcon;