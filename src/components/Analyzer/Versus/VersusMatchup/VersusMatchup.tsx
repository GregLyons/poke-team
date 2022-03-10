import { calculate, Generations, Move, Pokemon } from "@smogon/calc";


type VersusMatchupProps = {

};

const VersusMatchup = ({

}: VersusMatchupProps) => {
  const gen = Generations.get(7)
  const result = calculate(
    gen,
    new Pokemon(gen, 'Aegislash-Blade', {
      item: 'Choice Specs',
      nature: 'Timid',
      evs: {spa: 252},
      boosts: {spa: 1},
    }),
    new Pokemon(gen, 'Aegislash-Shield', {
      item: 'Chople Berry',
      nature: 'Calm',
      evs: {hp: 252, spd: 252},
    }),
    new Move(gen, 'shadowball')
  );
  
  console.log(result);
  return (
    <div>
      yo
    </div>
  );
};

export default VersusMatchup;