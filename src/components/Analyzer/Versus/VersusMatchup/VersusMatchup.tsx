import { useMemo } from "react";
import { GenNum } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { calcDamageMatchup } from "../../../../utils/damageCalc";
import './VersusMatchup.css';
import VersusMatchupHeader from "./VersusMatchupHeader";
import VersusMatchupRow from "./VersusMatchupRow";


type VersusMatchupProps = {
  userPokemon: (MemberPokemon | null)[]
  enemyPokemon: (MemberPokemon | null)[]
  gen: GenNum
};

const VersusMatchup = ({
  userPokemon,
  enemyPokemon,
  gen,
}: VersusMatchupProps) => {
  // const gen = Generations.get(7)
  // const result = calculate(
  //   gen,
  //   new Pokemon(gen, 'Aegislash-Blade', {
  //     nature: 'Timid',
  //     boosts: {spa: 1},
  //   }),
  //   new Pokemon(gen, 'Aegislash-Shield', {
  //     item: 'Chople Berry',
  //     nature: 'Calm',
  //     evs: {hp: 252, spd: 252},
  //   }),
  //   new Move(gen, 'shadowball')
  // ).fullDesc();
  
  const damageMatchup = useMemo(() => calcDamageMatchup({
    userPokemon,
    enemyPokemon,
    gen,
  }), [userPokemon, enemyPokemon, gen]);

  return (
    <div className="versus-matchup__wrapper">
      <VersusMatchupHeader
        enemyMembers={enemyPokemon}
      />
      {damageMatchup.map((resultRow, rowIdx) => <VersusMatchupRow
        key={rowIdx}
        userMember={userPokemon[rowIdx]}
        resultRow={resultRow}
      />)}
    </div>
  );
};

export default VersusMatchup;