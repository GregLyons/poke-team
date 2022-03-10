import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import PokemonIcon from "../../../Icons/PokemonIcon";

type VersusMatchupHeaderProps = {
  enemyMembers: (MemberPokemon | null)[]
};

const VersusMatchupHeader = ({
  enemyMembers,
}: VersusMatchupHeaderProps) => {
  return (
    <>
      {/* Filler */}
      <div />
      {enemyMembers.map((member, idx) => 
      <div
        key={idx}
        className="versus-matchup__icon"
      >
        <PokemonIcon
          pokemonIconDatum={member?.iconDatum || DUMMY_POKEMON_ICON_DATUM}
          gender={member?.gender}
        />
      </div>
      )}
    </>
  );
};

export default VersusMatchupHeader;