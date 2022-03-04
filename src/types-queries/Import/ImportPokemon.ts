import { gql } from "@apollo/client";
import { PokemonSet } from "@pkmn/sets";
import { EnablesItemEdge, PokemonFormEdge, RequiresItemEdge } from "../Builder/helpers";
import { MemberAbility, MemberAbilityQueryResult } from "../Builder/MemberAbility";
import { MemberItem, MemberItemQueryResult } from "../Builder/MemberItem";
import { MemberMove, MemberMoveQueryResult } from "../Builder/MemberMove";
import { MemberNature, MemberNatureQueryResult } from "../Builder/MemberNature";
import { MemberPokemon, MemberPokemonFromIconQueryResult, NatureName } from "../Builder/MemberPokemon";
import { CapsTypeName, GenerationNum, IntroductionEdge, PokemonIconDatum, StatTable, toTypeName } from "../helpers";
import { InvalidAbilityError, InvalidItemError, InvalidMoveError, InvalidNatureError, InvalidStatsError, LateIntroductionError, PSIDNotFoundError, toPSID, toStatTable } from "./helpers";

export type MemberPokemonFromSetQuery = {
  pokemonByPSIDs: MemberPokemonFromSetQueryResult[]
}

// This is a combination of the data contained in a PokemonIconDatum, as well as MemberPokemonFromIconQueryResult, both of which are necessary to create a MemberPokemon instance
export type MemberPokemonFromSetQueryResult = { 
  // Data for member Pokemon
  id: string
  name: string
  formattedName: string
  speciesName: string
  psID: string

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  typeNames: CapsTypeName[]
  baseStats: StatTable

  formClass: string
  forms: {
    edges: PokemonFormEdge[]
  }

  introduced: {
    edges: IntroductionEdge[]
  }

  enablesItem: {
    edges: EnablesItemEdge[]
  }

  requiresItem: {
    edges: RequiresItemEdge[]
  }
  
  // Data for abilities
  abilities: {
    edges: {
      node: MemberAbilityQueryResult
      slot: 'ONE' | 'TWO' | 'HIDDEN'
    }[]
  }
  
  // Data for moves
  moves: {
    edges: {
      node: MemberMoveQueryResult
      learnMethod: string
    }[]
  }
}

export type MemberPokemonFromSetQueryVars = {
  gen: GenerationNum
  psIDs: string[]
}

export const POKEMONSET_TO_MEMBER_QUERY = gql`
  query PokemonSetToMemberQuery($gen: Int! $psIDs: [String!]!) {
    pokemonByPSIDs(generation: $gen, psIDs: $psIDs) {
      # Pokemon data
      id
      name
      formattedName
      speciesName
      psID

      removedFromSwSh
      removedFromBDSP

      typeNames
      baseStats {
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }
      
      formClass
      forms {
        id
        edges {
          node {
            id
            name
            speciesName
            formattedName
            psID
          }
          class
        }
      }

      introduced {
        edges {
          node {
            number
          }
        }
      }

      enablesItem {
        id
        edges {
          node {
            id
            name
            formattedName
            psID

            introduced {
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      }
      requiresItem {
        id
        edges {
          node {
            id
            name
            formattedName
            psID

            introduced {
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      }
      
      # Ability data
      abilities {
        id
        edges {
          node {
            id
            name
            formattedName
            psID

            introduced {
              edges {
                node {
                  number
                }
              }
            }
          }
          slot
        }
      }

      # Moves
      moves {
        id
        edges {
          node {
            id
            name
            formattedName
            psID

            introduced {
              edges {
                node {
                  number
                }
              }
            }

            power
            pp
            accuracy
            category
            typeName

            removedFromSwSh
            removedFromBDSP

            requiresItem {
              id
              edges {
                node {
                  id
                  name
                  formattedName
                  psID
                }
              }
            }
          }
          learnMethod
        }
      }
    }
  }
`;

export const setsToMembers: (
  sets: PokemonSet[],
  results: MemberPokemonFromSetQueryResult[],
  itemResults: MemberItemQueryResult[],
  natureResults: MemberNatureQueryResult[],
  gen: GenerationNum
) => MemberPokemon[] = (sets, results, itemResults, natureResults, gen) => {
  // Verify that every set has a corresponding result, otherwise throw error
  // #region

  const memberPSIDs = results.map(d => d.psID);
  const invalidSets: number[] = [];
  sets.map((set, idx) => {
    if (!memberPSIDs.includes(toPSID(set.species)) && !memberPSIDs.includes(toPSID(set.name))) invalidSets.push(idx);
  });

  if (invalidSets.length > 0) throw new PSIDNotFoundError('', invalidSets);

  // #endregion

  let lateEntities: [string, GenerationNum][] = [];

  // Extract constructor data for MemberPokemon
  // #region

  const gqlMembers: MemberPokemonFromIconQueryResult[] = results.map(d => {
    // Check for late members
    if (d.introduced.edges[0].node.number > gen) lateEntities = lateEntities.concat([d.formattedName, d.introduced.edges[0].node.number]);

    return {
      ...d,
    };
  });

  const pokemonIconData: PokemonIconDatum[] = results.map(d => {
    return {
      ...d,
      typing: d.typeNames.map(toTypeName),
    };
  });

  let memberPokemonConstructorData: {
    gqlMember: MemberPokemonFromIconQueryResult
    pokemonIconDatum: PokemonIconDatum
    gen: GenerationNum
  }[] = [];
  for (let i: number = 0; i < Math.min(gqlMembers.length, pokemonIconData.length); i++) {
    memberPokemonConstructorData = memberPokemonConstructorData.concat([{
      gqlMember: gqlMembers[i],
      pokemonIconDatum: pokemonIconData[i],
      gen,
    }]);
  }

  // Throw error if a member was introduced later than 'gen'
  if (lateEntities.length > 0) throw new LateIntroductionError('', lateEntities);

  const memberPokemon = memberPokemonConstructorData.map(d => new MemberPokemon(d.gqlMember, d.pokemonIconDatum, d.gen));
  
  // Map for keeping track of memberPokemon
  let memberPokemonMap = new Map<string, MemberPokemon>();
  for (let member of memberPokemon) {
    memberPokemonMap.set(member.psID, member);
  }

  // #endregion

  // Assign MemberAbility and MemberMoves to MemberPokemon
  // #region

  sets.map((set, idx) => {
    let memberPSID = toPSID(set.species);

    // Find name of Pokemon in set. Error should not occur, as it should already have been handled in the first step. If not, it'll throw here instead, to be caught later
    if (!memberPSIDs.includes(memberPSID)) {
      memberPSID = toPSID(set.name);
      if (!memberPSIDs.includes(memberPSID)) throw new PSIDNotFoundError('', [idx]);
    }

    // Now that memberPSID has been found, find the corresponding MemberPokemon
    const memberPokemon = memberPokemonMap.get(memberPSID);

    // Type-guard
    if (!memberPokemon) return;

    // Get corresponding result
    const memberResult = results[memberPSIDs.indexOf(memberPSID)];

    // Ability
    // #region

    const abilityPSID = toPSID(set.ability);
    if (abilityPSID) {
      // If ability is valid for the Pokemon, assign it
      if (memberResult.abilities.edges.map(edge => edge.node.psID).includes(abilityPSID)) {
        const abilityResults = memberResult.abilities.edges.map(edge => edge.node);
        const abilityIndex = abilityResults.map(d => d.psID).indexOf(abilityPSID);

        // Shouldn't occur
        if (abilityIndex === -1) throw new InvalidAbilityError(set.ability, memberPokemon.formattedName);

        const abilityResult = abilityResults[abilityIndex];

        const slot = memberResult.abilities.edges[abilityIndex].slot;

        const memberAbility = new MemberAbility(abilityResult, gen, slot);

        // Check if ability is late
        if (memberAbility.introduced > gen) {
          lateEntities = lateEntities.concat([memberAbility.formattedName, memberAbility.introduced]);
        }

        // Finally, assign ability
        memberPokemon.assignAbility(memberAbility);
      }
      // Otherwise, throw error
      else throw new InvalidAbilityError(set.ability, memberPokemon.formattedName); 
    }

    // #endregion

    // Item
    // #region

    const itemPSID = toPSID(set.item);
    if (itemPSID) {
      if (itemResults.map(d => d.psID).includes(itemPSID)) {
        const itemIndex = itemResults.map(d => d.psID).indexOf(itemPSID);

        // Shouldn't occur
        if (itemIndex === -1) throw new InvalidItemError(set.item, memberPokemon.formattedName);

        const itemResult = itemResults[itemIndex];

        const memberItem = new MemberItem(itemResult, gen);

        // Check if item is late
        if (memberItem.introduced > gen) {
          lateEntities = lateEntities.concat([memberItem.formattedName, memberItem.introduced]);
        }

        // Finally, assign item
        memberPokemon.assignItem(memberItem);
      }
      else throw new InvalidItemError(set.item, memberPokemon.formattedName);
    }

    // #endregion

    // Moveset
    // #region

    set.moves.map((move, idx) => {
      // Cast movesetIdx as 0 | 1 | 2 | 3 so that we can assign it later
      const movesetIdx: 0 | 1 | 2 | 3= (idx as 0 | 1 | 2 | 3);
      // Shouldn't happen
      if (![0, 1, 2, 3].includes(movesetIdx)) throw new InvalidMoveError(move, memberPokemon.formattedName);

      // Set might have hidden power type in the name; in this case, remove it
      let movePSID = toPSID(move);
      if (movePSID.includes('hiddenpower')) { movePSID = 'hiddenpower'; }
      if (movePSID) {
        // If move is valid for the Pokemon, assign it
        if (memberResult.moves.edges.map(edge => edge.node.psID).includes(movePSID)) {
          // TODO Event-only moves; we'll need to account for different learn methods in this case
          const moveResults = memberResult.moves.edges.map(edge => edge.node);
          const moveIndex = moveResults.map(d => d.psID).indexOf(movePSID);

          // Shouldn't occur
          if (moveIndex === -1) throw new InvalidMoveError(move, memberPokemon.formattedName);

          const moveResult = moveResults[moveIndex];

          const memberMove = new MemberMove(moveResult, gen, false);

          // Check if move is late
          if (memberMove.introduced > gen) {
            lateEntities = lateEntities.concat([memberMove.formattedName, memberMove.introduced]);
          }

          // Finally, assign move
          memberPokemon.assignMove(memberMove, movesetIdx);
        }
        else throw new InvalidMoveError(move, memberPokemon.formattedName);
      }
    });

    // #endregion

    // Nature
    // #region

    const naturePSID = toPSID(set.nature);
    if (naturePSID) {
      const natureName: NatureName = (naturePSID as NatureName);
      if (natureName !== undefined && natureResults.map(d => d.name).includes(natureName)) {
        const natureIndex = natureResults.map(d => d.name).indexOf(natureName);

        // Shouldn't occur
        if (natureIndex === -1) throw new InvalidItemError(set.nature, memberPokemon.formattedName);

        const natureResult = natureResults[natureIndex];

        const memberNature = new MemberNature(natureResult);

        // Check if item is late
        if (memberNature.introduced > gen) {
          lateEntities = lateEntities.concat([memberNature.formattedName, memberNature.introduced]);
        }

        // Finally, assign item
        memberPokemon.assignNature(memberNature);
      }
      else throw new InvalidNatureError(set.nature, memberPokemon.formattedName);
    }

    // #endregion

    // Assign other stats
    // #region

    try {
      memberPokemon.assignEVs(toStatTable(set.evs, gen, 'ev'));
      memberPokemon.assignIVs(toStatTable(set.ivs, gen, 'iv'));
      memberPokemon.assignLevel(set.level || 100);

      set.shiny !== undefined && memberPokemon.assignShiny(set.shiny);
      set.happiness !== undefined && memberPokemon.assignHappiness(set.happiness);
      set.pokeball !== undefined && memberPokemon.assignPokeball(set.pokeball);
      set.hpType !== undefined && memberPokemon.assignHPType(set.hpType);
    }
    catch (e) {
      console.log(e);
      throw new InvalidStatsError('', memberPokemon.formattedName);
    }

    // #endregion
  });

  // Throw error if an ability, item, etc. was introduced later than 'gen'
  if (lateEntities.length > 0) throw new LateIntroductionError('', lateEntities);

  return Array.from(memberPokemonMap.values());

  // #endregion
}