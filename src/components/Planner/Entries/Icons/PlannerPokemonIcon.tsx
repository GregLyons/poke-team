import {
  PokemonIconDatum
} from "../../../../types-queries/helpers";
import PokemonIcon from "../../../Icons/PokemonIcon";
import './../Entries.css';


type PlannerPokemonIconProps = {
  pokemonIconDatum: PokemonIconDatum
  selected: boolean
  toggleSelection: (psID: string) => void
}

const PlannerPokemonIcon = ({
  pokemonIconDatum,
  selected,
  toggleSelection,
}: PlannerPokemonIconProps) => {

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    toggleSelection(pokemonIconDatum.psID);
  }

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
          backgroundColor: selected
            ? 'var(--blue1)' 
            : '',
          transition: 'background-color 0.2s',
          opacity: '0.8',
        }}
      />
      <PokemonIcon
        pokemonIconDatum={pokemonIconDatum}
        planner={true}
        onClick={onClick}
      />
    </div>
  );
};

export default PlannerPokemonIcon;