import {
  useState,
} from "react";
import { TeamAction } from "../../../../hooks/App/Team";
import {
  PokemonIconDatum,
} from "../../../../types-queries/helpers";
import {
  getPokemonIcon,
} from "../../../../utils/sprites";

import './../Entries.css';

type PlannerPokemonIconProps = {
  dispatches: {
    dispatchTeam: React.Dispatch<TeamAction>
  }
  key: string
  pokemonIconDatum: PokemonIconDatum
  selected: boolean
  toggleSelection: (psID: string) => void
}

const PlannerPokemonIcon = ({
  dispatches: {
    dispatchTeam,
  },
  key,
  pokemonIconDatum,
  selected,
  toggleSelection,
}: PlannerPokemonIconProps) => {
  const {left, top} = getPokemonIcon(pokemonIconDatum);

  const [hover, setHover] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    toggleSelection(pokemonIconDatum.psID);
    if (!selected) {
      dispatchTeam({
        type: 'toggle_replace_mode',
        payload: pokemonIconDatum,
      });
    }
    else {
      dispatchTeam({
        type: 'toggle_replace_mode',
        payload: null,
      })
    }
  }

  return (
    <div className="planner__pokemon-icon-container"
      style={{
        width: '50px',
        height: '30px',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    > 
      <div className="planner__pokemon-icon-track" />
      <div className="planner__pokemon-icon-background" 
        style={{
          width: '40px',
          height: '30px',
          borderRadius: '40%',
          backgroundColor: selected
            ? 'var(--blue1)' 
            : '',
          transition: 'background-color 0.2s',
          opacity: '0.8',
        }}
      />
      <div
        onClick={onClick}
        className="planner__pokemon-icon"
        title={`${pokemonIconDatum.formattedName}`}
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