import { PokemonIconDatum } from '../../../../../types-queries/helpers';
import './TeamBuilderIcons.css';

type TeamBuilderIconProps = {
  pokemonIconDatum?: PokemonIconDatum
}

const TeamBuilderIcon = ({
  pokemonIconDatum,
}: TeamBuilderIconProps) => {
  return (
    <div className="team-builder__icon-wrapper">
      Yo
    </div>
  );
};

export default TeamBuilderIcon;
