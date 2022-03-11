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
  // First entry is movePSID, second entry is fullDesc() from the calculate function; only moves which achieve minHits have an entry
  moveInfo: [string, string][]
  // The minimum number of hits to KO the target
  minHits: number
  // The max priority of the moves in moveInfo, i.e. of the moves which achieve minHits
  maxPriority: number
};

export type DamageMatchupResult = {
  userPSID: string
  enemyPSID: string
  userToEnemy: DamageMatchupSummary
  enemyToUser: DamageMatchupSummary
  outSpeed: boolean | null
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
      let moveInfo_userToEnemy: [string, string][] = [];
      let minHits_userToEnemy: number = Number.MAX_SAFE_INTEGER;
      let maxPriority_userToEnemy: number = Number.MIN_SAFE_INTEGER;

      for (let userMove of userMoves) {
        const result = calcDamage({
          attacker: userMember,
          defender: enemyMember,
          memberMove: userMove,
          gen,
        });
        
        let hits = Number.MAX_SAFE_INTEGER;
        try {
          // Returns number between 0 and 9
          hits = result.kochance().n;

          // Indicates move does damage but needs more than 9 hits
          if (hits === 0) {
            hits = 10;
          }
        }
        // Occurs as a result of kochance() when move does no damage
        catch {
          hits = 0;
        }

        if (hits !== 0 && hits < minHits_userToEnemy) {
          try {
            moveInfo_userToEnemy = [[userMove.psID, result.fullDesc()]];
          }
          // Occurs as a result of an inner call to kochance() when move does little-to-no damage
          catch {
            moveInfo_userToEnemy = [[userMove.psID, 'Does very little damage.']];
          }

          minHits_userToEnemy = hits;
          maxPriority_userToEnemy = userMove.priority;
        }
        else if (hits === minHits_userToEnemy) {
          try {
            moveInfo_userToEnemy.push([userMove.psID, result.fullDesc()]);
          }
          // Occurs as a result of an inner call to kochance() when move does little-to-no damage
          catch {
            moveInfo_userToEnemy.push([userMove.psID, 'Does very little damage.']);
          }

          if (userMove.priority > maxPriority_userToEnemy) {
            maxPriority_userToEnemy = userMove.priority;
          }
        }
      }
      userToEnemy = {
        moveInfo: moveInfo_userToEnemy,
        minHits: minHits_userToEnemy < Number.MAX_SAFE_INTEGER
          ? minHits_userToEnemy
          : 0,
        maxPriority: maxPriority_userToEnemy,
      };

      // Compute enemyToUser
      let enemyToUser: DamageMatchupSummary;
      let moveInfo_enemyToUser: [string, string][] = [];
      let minHits_enemyToUser: number = Number.MAX_SAFE_INTEGER;
      let maxPriority_enemyToUser: number = Number.MIN_SAFE_INTEGER;

      for (let enemyMove of enemyMoves) {
        const result = calcDamage({
          attacker: enemyMember,
          defender: userMember,
          memberMove: enemyMove,
          gen,
        });
      
        let hits = Number.MAX_SAFE_INTEGER;
        try {
          // Returns number between 0 and 9
          hits = result.kochance().n;
          
          // Indicates move does damage but needs more than 9 hits
          if (hits === 0) {
            hits = 10;
          }
        }
        // Occurs when move does no damage
        catch {
          hits = 0;
        }

        // If number of hits is strictly smaller, OR if number of hits is the same, but higher priority, use current move instead of old move
        if (hits !== 0 && hits < minHits_enemyToUser) {
          try {
            moveInfo_enemyToUser = [[enemyMove.psID, result.fullDesc()]];
          }
          // Occurs as a result of an inner call to kochance() when move does little-to-no damage
          catch {
            moveInfo_enemyToUser = [[enemyMove.psID, 'Does very little damage.']];
          }

          minHits_enemyToUser = hits;
          maxPriority_enemyToUser = enemyMove.priority;
        }
        else if (hits === minHits_enemyToUser) {
          try {
            moveInfo_enemyToUser.push([enemyMove.psID, result.fullDesc()]);
          }
          // Occurs as a result of an inner call to kochance() when move does little-to-no damage
          catch {
            moveInfo_enemyToUser.push([enemyMove.psID, 'Does very little damage.']);
          }

          if (enemyMove.priority > maxPriority_enemyToUser) {
            maxPriority_enemyToUser = enemyMove.priority;
          }
        }
      }
      enemyToUser = {
        moveInfo: moveInfo_enemyToUser,
        minHits: minHits_enemyToUser < Number.MAX_SAFE_INTEGER
          ? minHits_enemyToUser
          : 0,
        maxPriority: maxPriority_enemyToUser,
      };

      const outSpeed = userMember.computeSpeed() > enemyMember.computeSpeed()
        ? true
        : userMember.computeSpeed() === enemyMember.computeSpeed()
          ? null
          : false;

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