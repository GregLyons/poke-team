import {
  useState,
} from "react";
import { CartAction } from "../../hooks/App/Cart";
import { TeamAction } from "../../hooks/App/Team";
import {
  PokemonIconDatum,
} from "../../types-queries/helpers";
import {
  getPokemonIcon,
} from "../../utils/sprites";

type PlannerPokemonIconProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  key: string
  pokemonIconDatum: PokemonIconDatum
  selected: boolean
  toggleSelection: (psID: string) => void
}

const PlannerPokemonIcon = ({
  dispatchCart,
  dispatchTeam,
  key,
  pokemonIconDatum,
  selected,
  toggleSelection,
}: PlannerPokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  const [hover, setHover] = useState(false);

  return (
    <div className="planner__pokemon-icon-container"
      style={{
        width: '40px',
        height: '30px',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="planner__pokemon-icon-background" 
        style={{
          width: '40px',
          height: '30px',
          backgroundColor: (!selected && hover) || (selected && !hover)
            ? 'lightblue' 
            : '',
        }}
      />
      <div
        onClick={(e) => toggleSelection(pokemonIconDatum.psID)}
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
    </div>
  );
};

export default PlannerPokemonIcon;