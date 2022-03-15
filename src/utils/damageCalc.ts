import { calculate, Generations, Move, Pokemon, Result } from "@smogon/calc";
import { ABBREVIATED_BASE_STAT_NAMES } from "../hooks/App/PokemonFilter";
import { AbbreviatedBaseStatName, computeStat, GenNum, StatTable } from "../types-queries/entities";
import { NatureName } from "../types-queries/Member/helpers";
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
    nature: natureName,
    moves: moveNames,
    curHP: options?.curHP,
    evs,
    ivs,
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

export type StatPSIDObject = {
  // User's stats relevant to the interaction
  user: (AbbreviatedBaseStatName | NatureName)[]
  // Enemy's stats relevant to the interaction
  enemy: (AbbreviatedBaseStatName | NatureName)[]
}

export type DamageMatchupSummary = {
  // First entry is movePSID, second entry is fullDesc() from the calculate function; only moves which achieve minHits have an entry
  moveInfo: [string, string][]
  // List of stats relevant to the interaction, and may include nature
  statInfo: StatPSIDObject
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
  moveFirst: boolean | null
}

// True if the EVs/IVs/Nature of the user/enemy matter in determining whether one's speed is greater than the other's, false otherwise
const speedStatMatters = (user: MemberPokemon, enemy: MemberPokemon, gen: GenNum) => {
  const userMinSpeed = computeStat({
    statName: 'speed',
    level: user.level,
    base: user.baseStats.speed,
    natureModifiesStat: {
      // Other stats irrelevant
      boosts: null,
      reduces: 'speed',
    },
    ev: 0,
    ivOrDV: 0,
    gen,
    // Irrelevant to computation
    isShedinja: false,
  });

  const userMaxSpeed = computeStat({
    statName: 'speed',
    level: user.level,
    base: user.baseStats.speed,
    natureModifiesStat: {
      boosts: 'speed',
      reduces: null,
    },
    ev: 252,
    ivOrDV: gen > 2 ? 31 : 15,
    gen,
    isShedinja: false,
  });

  const enemyMinSpeed = computeStat({
    statName: 'speed',
    level: enemy.level,
    base: enemy.baseStats.speed,
    natureModifiesStat: {
      boosts: null,
      reduces: 'speed',
    },
    ev: 0,
    ivOrDV: 0,
    gen,
    isShedinja: false,
  });


  const enemyMaxSpeed = computeStat({
    statName: 'speed',
    level: enemy.level,
    base: enemy.baseStats.speed,
    natureModifiesStat: {
      boosts: 'speed',
      reduces: null,
    },
    ev: 252,
    ivOrDV: gen > 2 ? 31 : 15,
    gen,
    isShedinja: false,
  });
  
  // !(user always faster than enemy OR user always slower than enemy)
  return !(userMinSpeed >= enemyMaxSpeed || userMaxSpeed <= enemyMinSpeed);
};

// Rate matchup 1-5, 1 being bad for user, 5 being good for user; 0 for when we don't want to give opinion
export const rateDamageMatchupResult = (result: DamageMatchupResult | null) => {
  if (result === null) return 0;

  const { userToEnemy, enemyToUser, moveFirst } = result;
  
  let userGuaranteed = false;
  for (let [_, display] of result.userToEnemy.moveInfo) {
    if (display.includes('guaranteed')) userGuaranteed = true;
  }
  let enemyGuaranteed = false;
  for (let [_, display] of result.enemyToUser.moveInfo) {
    if (display.includes('guaranteed')) enemyGuaranteed = true;
  }

  // User move-first and OHKO
  if (moveFirst && userToEnemy.minHits === 1) {
    // Guaranteed
    if (userGuaranteed) return 5;

    // Not guaranteed

    // Enemy can OHKO; risky
    if (enemyToUser.minHits === 1) return 3;

    // Enemy can't OHKO
    return 4;
  }

  // Enemy move-first and OHKO
  if (moveFirst === false && enemyToUser.minHits === 1) {
    // Guaranteed
    if (enemyGuaranteed) return 1;

    // Not guaranteed

    // User can OHKO, but still risky
    if (userToEnemy.minHits === 1) return 2;

    // User can't OHKO
    return 1;
  }

  // User guaranteed OHKO, and enemy can't OHKO
  if (userToEnemy.minHits === 1 && userGuaranteed) {
    // Enemy needs 3 or more hits to KO user
    if (enemyToUser.minHits > 2) return 5;

    // Enemy can 2HKO user
    return 4;
  }

  // Enemy guaranteed OHKO, and user can't OHKO
  if (enemyToUser.minHits === 1 && enemyGuaranteed) {
    // User needs 3 or more hits to KO enemy
    if (userToEnemy.minHits > 2) return 1;

    // User can 2HKO enemy
    return 2;
  }

  // User walls
  let userWalls = false;
  if (enemyToUser.minHits > 4) {
    userWalls = true;
  }

  // Enemy walls
  let enemyWalls = false;
  if (userToEnemy.minHits > 4) {
    enemyWalls = true;
  }

  // If both Pokemon wall each other, it's a wash
  if (userWalls && enemyWalls) return 3;

  // User walls enemy, but enemy doesn't wall user
  if (userWalls && !enemyWalls) return 4;

  // Enemy walls user, but user doesn't wall enemy
  if (!userWalls && enemyWalls) return 2;

  // Neither user nor enemy walls

  // User moves first
  if (moveFirst) {
    // User KOs enemy in fewer hits, or guaranteed equal hits
    if (userToEnemy.minHits < enemyToUser.minHits || (userToEnemy.minHits === enemyToUser.minHits && userGuaranteed)) return 4;

    // Enemy KOs user in one fewer hit, or possible equal hits
    if (userToEnemy.minHits - enemyToUser.minHits <= 1) return 3;

    // Enemy KOs user in two or more fewer hits
    return 2;
  }

  // Enemy moves first
  if (moveFirst === false) {
    // Enemy KOs user in fewer hits, or guaranteed equal hits
    if (enemyToUser.minHits < userToEnemy.minHits || (enemyToUser.minHits === userToEnemy.minHits && enemyGuaranteed)) return 2;

    // User KOs enemy in one fewer hit, or possible equal hits
    if (userToEnemy.minHits - enemyToUser.minHits <= 1) return 3;

    // User KOs enemy in two or more fewer hits
    return 4;
  }
  
  // Speed-tie
  if (moveFirst === null) {

    // Enemy can kill user in equal or fewer hits
    if (enemyToUser.minHits <= userToEnemy.minHits) return 2;

    // User can kill enemy in fewer hits
    return 3;
  }

  // Otherwise, return nothing
  return 0;
};

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
      // #region
      
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

      // #endregion

      // Compute enemyToUser
      // #region

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

      // #endregion

      // Determine movesFirst
      // #region

      const outSpeed = userMember.computeSpeed() > enemyMember.computeSpeed()
        ? true
        : userMember.computeSpeed() === enemyMember.computeSpeed()
          ? null
          : false;

      const outPriority = maxPriority_userToEnemy > maxPriority_enemyToUser
        ? true
        : maxPriority_userToEnemy === maxPriority_enemyToUser
          ? null
          : false;
      
      const moveFirst = outPriority
        // User has higher priority
        ? true
        // User has equal or lower priority
        : outPriority === null
          // Equal priority
          ? outSpeed
            // User has higher speed
            ? true
            // User has equal or lower speed
            : outSpeed === null
              // Speed-tie
              ? null
              // Enemy out-speeds
              : false
          // Enemy has higher priority
          : false;

      // #endregion

      // Determine relevant stats and add them to psIDs
      // #region

      // If priorities are unequal, speed doesn't matter
      const speedMatters = maxPriority_userToEnemy === maxPriority_enemyToUser;

      // If speed matters, and if the min-max speed range of the user and enemy overlap, then the speed stat matters in the turn order
      const speedMattersToTurnOrder = speedMatters && speedStatMatters(userMember, enemyMember, gen);

      const defaultObj: StatPSIDObject = {
        user: speedMattersToTurnOrder
          ? ['Spe']
          : [],
        enemy: speedMattersToTurnOrder
          ? ['Spe']
          : [],
      };

      // userToEnemy stats
      const userToEnemyStatPSIDs: StatPSIDObject = moveInfo_userToEnemy.reduce((acc, [_, display]) => {
        // In userToEnemy, display is of the form [user info] vs. [enemy info]: [other info]
        const displayParts = display.split(/vs\.|:/);

        if (displayParts.length === 0) return acc;

        const userPart = displayParts[0];
        const userStats: AbbreviatedBaseStatName[] = [];
        for (let baseStatName of ABBREVIATED_BASE_STAT_NAMES) {
          if (userPart.includes(baseStatName)) userStats.push(baseStatName);
        }

        // If userPart or enemyPart has '+' or '-', then their nature is relevant to the interaction; if speed matters, then also highlight nature
        let userNature: NatureName | undefined;
        if (userPart.includes('+') || userPart.includes('-') || speedMattersToTurnOrder) {
          userNature = userMember.nature?.name;
        }

        // Shouldn't happen
        if (displayParts.length === 1) return {
          ...acc,
          user: userNature
            ? acc.user.concat(userStats).concat([userNature])
            : acc.user.concat(userStats),
        }

        const enemyPart = displayParts[1];
        const enemyStats: AbbreviatedBaseStatName[] = [];
        for (let baseStatName of ABBREVIATED_BASE_STAT_NAMES) {
          if (enemyPart.includes(baseStatName)) enemyStats.push(baseStatName);
        }

        let enemyNature: NatureName | undefined;
        if (enemyPart.includes('+') || enemyPart.includes('-') || speedMattersToTurnOrder) {
          enemyNature = enemyMember.nature?.name;
        }

        return {
          user: userNature
            ? acc.user.concat(userStats).concat([userNature])
            : acc.user.concat(userStats),
          enemy: enemyNature
            ? acc.enemy.concat(enemyStats).concat([enemyNature])
            : acc.enemy.concat(enemyStats),
        }
      }, { ...defaultObj, });

      const enemyToUserStatPSIDs: StatPSIDObject = moveInfo_enemyToUser.reduce((acc, [_, display]) => {
        // In enemyToUser, display is of the form [enemy info] vs. [user info]: [other info]
        const displayParts = display.split(/vs\.|:/);
        
        if (displayParts.length === 0) return acc;

        const enemyPart = displayParts[0];
        const enemyStats: AbbreviatedBaseStatName[] = [];
        for (let baseStatName of ABBREVIATED_BASE_STAT_NAMES) {
          if (enemyPart.includes(baseStatName)) enemyStats.push(baseStatName);
        }
        
        // If userPart or enemyPart has '+' or '-', then their nature is relevant to the interaction
        let enemyNature: NatureName | undefined;
        if (enemyPart.includes('+') || enemyPart.includes('-') || speedMattersToTurnOrder) {
          enemyNature = enemyMember.nature?.name;
        }

        if (displayParts.length === 1) return {
          ...acc,
          enemy: enemyNature
            ? acc.enemy.concat(enemyStats).concat([enemyNature])
            : acc.enemy.concat(enemyStats),
        }

        const userPart = displayParts[1];
        const userStats: AbbreviatedBaseStatName[] = [];
        for (let baseStatName of ABBREVIATED_BASE_STAT_NAMES) {
          if (userPart.includes(baseStatName)) userStats.push(baseStatName);
        }

        // If userPart or enemyPart has '+' or '-', then their nature is relevant to the interaction
        let userNature: NatureName | undefined;
        if (userPart.includes('+') || userPart.includes('-') || speedMattersToTurnOrder) {
          userNature = userMember.nature?.name;
        }

        return {
          user: userNature
            ? acc.user.concat(userStats).concat([userNature])
            : acc.user.concat(userStats),
          enemy: enemyNature
            ? acc.enemy.concat(enemyStats).concat([enemyNature])
            : acc.enemy.concat(enemyStats),
        }
      }, { ...defaultObj, });


      // #endregion

      userToEnemy = {
        moveInfo: moveInfo_userToEnemy,
        statInfo: userToEnemyStatPSIDs,
        minHits: minHits_userToEnemy < Number.MAX_SAFE_INTEGER
          ? minHits_userToEnemy
          : 0,
        maxPriority: maxPriority_userToEnemy,
      };

      enemyToUser = {
        moveInfo: moveInfo_enemyToUser,
        statInfo: enemyToUserStatPSIDs,
        minHits: minHits_enemyToUser < Number.MAX_SAFE_INTEGER
          ? minHits_enemyToUser
          : 0,
        maxPriority: maxPriority_enemyToUser,
      };

      resultRow.push({
        userPSID: userMember.psID,
        enemyPSID: enemyMember.psID,
        userToEnemy,
        enemyToUser,
        moveFirst,
      });
    }
    
    results.push(resultRow);
  }

  return results;
};

export const resultToStatPSIDs = (result: DamageMatchupResult, userOrEnemy: 'user' | 'enemy') => {
  return result.userToEnemy.statInfo[userOrEnemy].concat(result.enemyToUser.statInfo[userOrEnemy]);
}