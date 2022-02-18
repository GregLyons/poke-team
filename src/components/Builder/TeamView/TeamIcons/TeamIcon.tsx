import { PokemonIconDatum } from '../../../../types-queries/helpers';
import './TeamIcons.css';

type TeamIconProps = {
  pokemonIconDatum?: PokemonIconDatum
}

const TeamIcon = ({
  pokemonIconDatum,
}: TeamIconProps) => {
  return (
    <div className="team-icon__wrapper">
      <div className="team-icon__header">
        Member
      </div>
    </div>
  );
};

export default TeamIcon;
