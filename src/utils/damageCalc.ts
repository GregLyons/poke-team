import { calculate, Generations, Move, Pokemon, Result } from "@smogon/calc";
import { GenNum, StatTable } from "../types-queries/entities";
import { MemberMove } from "../types-queries/Member/MemberMove";
import { MemberPokemon } from "../types-queries/Member/MemberPokemon";

export const MEMBERPOKEMON_TO_SMOGONPOKEMON: (
  member: MemberPokemon,
  gen: GenNum,
  options?: {
    curHP: number,
    boosts: StatTable,
  },
) => Pokemon = (member, gen, options) => {
  const { formattedPSID, ability, item, nature, moveset: moves, evs, ivs, } = member;
  const abilityName = ability?.formattedPSID;
  const itemName = item?.formattedPSID
  const moveNames = (moves.map(move => move !== null ? move?.formattedPSID : undefined).filter(move => move) as string[]);
  const natureName = nature?.formattedName;

  return new Pokemon(gen, formattedPSID, {
    ability: abilityName,
    item: itemName,
    moves: moveNames,
    nature: natureName,
    curHP: options?.curHP,
    boosts: options?.boosts,
  });
};

export const MEMBERMOVE_TO_SMOGONMOVE: (
  move: MemberMove,
  gen: GenNum,
) => Move = (move, gen) => {
  const { formattedPSID } = move;

  return new Move(gen, formattedPSID);
}

export function calcDamage ({
  attacker,
  defender,
  memberMove,
  gen,
} : {
  attacker: MemberPokemon,
  defender: MemberPokemon,
  memberMove: MemberMove,
  gen: GenNum
}): Result {
  const attackerPokemon = MEMBERPOKEMON_TO_SMOGONPOKEMON(attacker, gen);
  const defenderPokemon = MEMBERPOKEMON_TO_SMOGONPOKEMON(defender, gen);
  const move = MEMBERMOVE_TO_SMOGONMOVE(memberMove, gen);
  const generation = Generations.get(gen);

  return calculate(
    generation,
    attackerPokemon,
    defenderPokemon,
    move,
  );
};

export type DamageMatchupSummary = {
  movePSID: string
  minHits: number
  priority: number
  display: string
};

export type DamageMatchupResult = {
  userPSID: string
  enemyPSID: string
  userToEnemy: DamageMatchupSummary
  enemyToUser: DamageMatchupSummary
  outSpeed: boolean
}

export function calcDamageMatchup ({
  userPokemon,
  enemyPokemon,
  gen,
}: {
  userPokemon: (MemberPokemon | null)[]
  enemyPokemon: (MemberPokemon | null)[]
  gen: GenNum
}): (DamageMatchupResult | null)[][] {
  // Coordinates are i (row), j (column)
  let results: (DamageMatchupResult | null)[][] = []

  // Iterate over members of user's team
  for (let i = 0; i < userPokemon.length; i++) {
    const userMember = userPokemon[i];

    // If no actual member, move on
    if (userMember === null) {
      results.push(Array(6).fill(null));
      continue;
    }

    const userMoves = userMember.moveset.filter(move => move !== null) as MemberMove[];

    let resultRow = [];

    // Iterate over members of enemy's team
    for (let j = 0; j < enemyPokemon.length; j++) {
      const enemyMember = enemyPokemon[j];

      // If no actual member, move on
      if (enemyMember === null) {
        resultRow.push(null);
        continue;
      }

      const enemyMoves = enemyMember.moveset.filter(move => move !== null) as MemberMove[];

      // Compute userToEnemy
      let userToEnemy: DamageMatchupSummary;
      let movePSID_userToEnemy: string = '';
      let minHits_userToEnemy: number = Number.MAX_SAFE_INTEGER;
      let display_userToEnemy: string = 'No damaging moves.';
      let priority_userToEnemy = 0;
      for (let userMove of userMoves) {
        try {
          const result = calcDamage({
            attacker: userMember,
            defender: enemyMember,
            memberMove: userMove,
            gen});
  
          const hits = result.kochance().n;
  
          // If number of hits is strictly smaller, OR if number of hits is the same, but higher priority, use current move instead of old move
          if (hits < minHits_userToEnemy || (hits === minHits_userToEnemy && userMove.priority > priority_userToEnemy)) {
            movePSID_userToEnemy = userMove.psID;
            minHits_userToEnemy = hits;
            display_userToEnemy = result.fullDesc();
            priority_userToEnemy = userMove.priority;
          }
        }
        catch (e) {
        }
      }
      userToEnemy = {
        movePSID: movePSID_userToEnemy,
        minHits: minHits_userToEnemy,
        display: display_userToEnemy,
        priority: priority_userToEnemy,
      };

      // Compute enemyToUser
      let enemyToUser: DamageMatchupSummary;
      let movePSID_enemyToUser: string = '';
      let minHits_enemyToUser: number = Number.MAX_SAFE_INTEGER;
      let display_enemyToUser: string = 'No damaging moves.';
      let priority_enemyToUser = 0;
      for (let enemyMove of enemyMoves) {
        try {
          const result = calcDamage({
            attacker: enemyMember,
            defender: userMember,
            memberMove: enemyMove,
            gen});
  
          const hits = result.kochance().n;
  
          // If number of hits is strictly smaller, OR if number of hits is the same, but higher priority, use current move instead of old move
          if (hits < minHits_enemyToUser || (hits === minHits_enemyToUser && enemyMove.priority > priority_enemyToUser)) {
            movePSID_enemyToUser = enemyMove.psID;
            minHits_enemyToUser = hits;
            display_enemyToUser = result.fullDesc();
            priority_userToEnemy = enemyMove.priority;
          }
        }
        catch (e) {
        }
      }
      enemyToUser = {
        movePSID: movePSID_enemyToUser,
        minHits: minHits_enemyToUser,
        display: display_enemyToUser,
        priority: priority_enemyToUser
      };

      const outSpeed = userMember.baseStats.speed > enemyMember.baseStats.speed;

      // Add data to array
      resultRow.push({
        userPSID: userMember.psID,
        enemyPSID: enemyMember.psID,
        userToEnemy,
        enemyToUser,
        outSpeed,
      });
    }
    
    results.push(resultRow);
  }

  return results;
};