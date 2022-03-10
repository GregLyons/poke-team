import { GenNum } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { calcDamageMatchup } from "../../../../utils/damageCalc";


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
  
  console.log(calcDamageMatchup({
    userPokemon,
    enemyPokemon,
    gen,
  }));

  return (
    <div>
      yo
    </div>
  );
};

export default VersusMatchup;