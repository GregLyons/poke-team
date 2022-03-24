import { gql } from "@apollo/client"
import { PokemonSet } from "@pkmn/data"
import { Dex } from "@pkmn/dex"
import { Sets } from "@pkmn/sets"
import { EnablesItemEdge, PokemonFormEdge, pokemonFormEdgeToFormDatum, RequiresItemEdge, spreadSummary } from "../Builder/helpers"
import { BaseStatName, computeStat, GenNum, ivsToHiddenPower, StatTable, statTableToPSStatsTable } from "../entities"
import { PokemonIconDatum, TypeName } from "../helpers"
import { DEFAULT_DV_SPREAD, DEFAULT_EV_SPREAD, DEFAULT_EV_SPREAD_GENS12, DEFAULT_IV_SPREAD, GenderName, hiddenPowerToMaxIVs, MemberEntity, MemberResult, MoveSlot } from "./helpers"
import { MemberAbility } from "./MemberAbility"
import { enablesItemEdgeToMemberItem, MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem"
import { MemberMove } from "./MemberMove"
import { MemberNature } from "./MemberNature"


export interface MemberPokemonQuery {
  pokemonByPSID: MemberPokemonResult[]
}

export interface MemberPokemonResult extends MemberResult {
  speciesName: string
  formattedPSID: string

  maleRate: number
  femaleRate: number
  genderless: boolean

  formClass: string
  forms: {
    edges: PokemonFormEdge[]
  }

  enablesItem: {
    edges: EnablesItemEdge[]
  }

  requiresItem: {
    edges: RequiresItemEdge[]
  }
}

export interface MemberPokemonVars {
  gen: GenNum
  psID: string
}

export const POKEMONICON_TO_MEMBER_QUERY = gql`
  query PokemonIconToMemberQuery($gen: Int! $psID: String!) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      name
      speciesName
      psID
      formattedName
      formattedPSID

      maleRate
      femaleRate
      genderless
      
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
            formattedPSID
          }
          class
        }
      }

      introduced {
        id
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
            formattedPSID

            introduced {
              id
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
            formattedPSID

            introduced {
              id
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class MemberPokemon extends MemberEntity {
  public speciesName: string

  public typing: TypeName[]
  public baseStats: StatTable

  public iconDatum: PokemonIconDatum

  public removedFromSwSh: boolean
  public removedFromBDSP: boolean

  public moveset: (MemberMove | null)[]
  public ability?: MemberAbility
  public item?: MemberItem

  public evs: StatTable
  public ivs: StatTable
  public nature?: MemberNature
  public level: number

  public enablesItem: MemberItem[]
  public requiresItem: MemberItem[]

  public maleRate: number
  public femaleRate: number
  public genderless: boolean
  public gender: GenderName

  public nickname?: string
  public shiny?: boolean
  public happiness?: number
  public hpType?: TypeName

  // Not used in this app, but imported sets may have it, so we keep track of it for exporting
  public pokeball?: string

  // For keeping track of G-max
  public formClass: string

  // Handling cosmetic forms
  private forms: {
    edges: PokemonFormEdge[]
  }
  // An array including the icon data for this Pokemon's cosmetic forms. Note that if this Pokemon is itself a cosmetic form, then the base form will be listed as a cosmetic form here.
  public cosmeticForms: PokemonIconDatum[]

  // For making copy
  private gqlMember: MemberPokemonResult

  constructor(gqlMember: MemberPokemonResult, pokemonIconDatum: PokemonIconDatum, gen: GenNum) {
    super(gqlMember, gen);

    const {
      typing, baseStats, 
      removedFromSwSh, removedFromBDSP,
    } = pokemonIconDatum;
    
    this.iconDatum = pokemonIconDatum;

    const { 
      speciesName,
      enablesItem, requiresItem,
      formClass, forms,
      maleRate, femaleRate, genderless,
    } = gqlMember;

    this.gqlMember = gqlMember;

    this.speciesName = speciesName;

    this.maleRate = maleRate;
    this.femaleRate = femaleRate;
    this.genderless = genderless;

    // If possible for Pokemon to be male, set it to be male by default
    if (maleRate > 0) {
      this.gender = 'M';
    }
    // Otherwise, if the Pokemon can be female, set it to female
    else if (femaleRate > 0) {
      this.gender = 'F';
    }
    // Otherwise, set it to neutral
    else {
      this.gender = 'N';
    }

    this.typing = typing;
    this.baseStats = baseStats;

    this.removedFromSwSh = removedFromSwSh;
    this.removedFromBDSP = removedFromBDSP;

    this.moveset = [null, null, null, null];

    if (gen < 3) {
      this.evs = { ...DEFAULT_EV_SPREAD_GENS12, };
      this.ivs = { ...DEFAULT_DV_SPREAD, };
    }
    else {
      this.evs = { ...DEFAULT_EV_SPREAD, };
      this.ivs = { ...DEFAULT_IV_SPREAD, };
    }

    this.level = 100;
    this.happiness = 255;

    this.enablesItem = enablesItem.edges.map(edge => enablesItemEdgeToMemberItem(edge, gen));
    this.requiresItem = requiresItem.edges.map(edge => requiresItemEdgeToMemberItem(edge, gen));

    this.formClass = formClass;

    this.forms = forms;
    this.cosmeticForms = forms.edges
      // Map to PokemonFormDatum
      .map(pokemonFormEdgeToFormDatum)
      // Only select cosmetic forms/the base form
      .filter(d => d.formClass === 'COSMETIC')
      // Map to PokemonIconDatum
      .map(d => {
        const { id, psID, formattedName, } = d;
        return {
          id,
          formattedName,
          psID,

          removedFromSwSh,
          removedFromBDSP,

          typing,
          baseStats,
        };
      });
  }

  // Get computed stats
  // #region

  public computeHP() {
    return computeStat({
      statName: 'hp',
      level: this.level,
      base: this.baseStats.hp,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.hp,
      ivOrDV: this.ivs.hp,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  public computeAttack() {
    return computeStat({
      statName: 'attack',
      level: this.level,
      base: this.baseStats.attack,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.attack,
      ivOrDV: this.ivs.attack,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  public computeDefense() {
    return computeStat({
      statName: 'defense',
      level: this.level,
      base: this.baseStats.defense,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.defense,
      ivOrDV: this.ivs.defense,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  public computeSpecialAttack() {
    return computeStat({
      statName: 'specialAttack',
      level: this.level,
      base: this.baseStats.specialAttack,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.specialAttack,
      ivOrDV: this.ivs.specialAttack,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  public computeSpecialDefense() {
    return computeStat({
      statName: 'specialDefense',
      level: this.level,
      base: this.baseStats.specialDefense,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.specialDefense,
      ivOrDV: this.ivs.specialDefense,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  public computeSpeed() {
    console.log('speed for', this.psID);
    return computeStat({
      statName: 'speed',
      level: this.level,
      base: this.baseStats.speed,
      natureModifiesStat: this.nature?.modifiesStat,
      ev: this.evs.speed,
      ivOrDV: this.ivs.speed,
      gen: this.gen,
      isShedinja: this.psID === 'shedinja',
    });
  }

  // #endregion

  // Exporting as PokemonSet
  // #region

  public toPokemonSet() {
    const pokemonSet: PokemonSet = {
      name: this.psID,
      species: this.speciesName,
      item: this.item?.psID || '',
      ability: this?.ability?.psID || '',
      moves: this.moveset.map(move => move?.psID || ''),
      nature: this.nature?.name || 'serious',
      gender: this.gender || '',
      evs: statTableToPSStatsTable(this.evs),
      ivs: statTableToPSStatsTable(this.ivs),
      level: this.level,
      shiny: this.shiny,
      happiness: this.happiness,
      pokeball: this.pokeball,
      hpType: this.hpType,
      gigantamax: this.formClass === 'GMAX',
    };

    return pokemonSet;
  }

  public toSetString() {
    return Sets.toString(this.toPokemonSet(), Dex.forGen(this.gen));
  }

  // #endregion

  public setGen(newGen: GenNum) {
    this.gen = newGen;
  }

  public assignAbility(newAbility: MemberAbility) {
    this.ability = newAbility;
  }

  public assignMove(newMove: MemberMove | null, slot: MoveSlot) {
    this.moveset = this.moveset.map((d, idx) => {
      if (idx === slot) return newMove;
      else return d;
    });
  }

  public assignItem(newItem: MemberItem) {
    this.item = newItem;
  }

  public assignEV(stat: BaseStatName, newValue: number) {
    // Check that EV is in valid range
    if (newValue < 0 || newValue > 252) throw new Error(`Invalid value for ${stat} EV: ${newValue}.`);

    // Check that EV total remains below 510 for Gens 3 onward
    const newEVTotal = Object.entries(this.evs).reduce((acc, curr) => {
      if ((curr[0] as BaseStatName) !== stat) return acc + curr[1];
      else return acc + newValue;
    }, 0);

    // After gen 2, total EVs can't exceed 510
    if (newEVTotal > 510 && ![1, 2].includes(this.gen)) {
      let currentEVTotal = 0;
      for (let value of Object.values(this.evs)) {
        currentEVTotal += value;
      }

      this.evs = {
        ...this.evs,
        [stat]: this.evs[stat] + (510 - currentEVTotal),
      }
    }
    else {
      this.evs = {
        ...this.evs,
        [stat]: newValue,
      };
    }
  }

  public assignEVs(newEVs: StatTable) {
    for (let [key, value] of Object.entries(newEVs)) {
      const statName = key as BaseStatName;

      if (!statName) return;

      this.assignEV(statName, value);
    }
  }

  public assignIV(stat: BaseStatName, newValue: number) {
    // Check that IV is in valid range; 0-31 Gen 3 onwards, 0-15 Gens 1 and 2
    if (newValue < 0 || newValue > 31 || (newValue > 15 && [1, 2].includes(this.gen))) throw new Error(`Invalid value for ${stat} IV in Generation ${this.gen}: ${newValue}.`)

    this.ivs = {
      ...this.ivs,
      [stat]: newValue,
    };

    // Special DV in Gens 1 and 2
    if (stat === 'specialAttack' && this.gen < 3) {
      this.ivs = {
        ...this.ivs,
        specialDefense: newValue,
      }
    }
    else if (stat === 'specialDefense' && this.gen < 3) {
      this.ivs = {
        ...this.ivs,
        specialAttack: newValue,
      }
    }

    // Change 'this.hpType' to match with 'this.ivs'
    if (this.gen > 1) {
      this.hpType = ivsToHiddenPower(this.ivs, this.gen).type;
    }
  }

  public assignIVs(newIVs: StatTable) {
    for (let [key, value] of Object.entries(newIVs)) {
      const statName = key as BaseStatName;

      if (!statName) return;

      this.assignIV(statName, value);

      // Change 'this.hpType' to match with 'this.ivs'
      if (this.gen > 1) {
        this.hpType = ivsToHiddenPower(this.ivs, this.gen).type;
      }
    }
  }

  public assignNature(newNature: MemberNature) {
    this.nature = newNature;
  }

  public assignNickname(newNickname: string) {
    this.nickname = newNickname;
  }

  public assignLevel(newLevel: number) {
    if (newLevel < 0 || newLevel > 100) throw new Error(`Invalid level: ${newLevel}`);

    this.level = newLevel;
  }

  public assignGender(newGender: GenderName) {
    this.gender = newGender;
  }

  public assignShiny(newShinyValue: boolean) {
    if (this.gen === 1) this.shiny = false;
    else this.shiny = newShinyValue;
  }

  public toggleShiny() {
    if (this.gen === 1) this.shiny = false;
    else this.shiny = !this.shiny;
  }

  public assignHappiness(newHappinessValue: number) {
    // Happiness must be between 0 and 255
    if (newHappinessValue < 0 || newHappinessValue > 255) throw new Error(`Invalid happiness value: ${newHappinessValue}`);

    // Happiness not a battle mechanic in Gens 1 or 8
    if (![1, 8].includes(this.gen)) this.happiness = newHappinessValue;
  }

  public assignPokeball(newPokeball: string) {
    this.pokeball = newPokeball;
  }

  // Will change 'this.ivs' to be the DVs/IVs which given the maximal power for the given type.
  public assignHPType(newHPType?: TypeName) {
    if (!newHPType || ['fairy', 'normal'].includes(newHPType)) return;

    this.hpType = newHPType;
    this.ivs = hiddenPowerToMaxIVs(newHPType);
  }

  public evsSummary() {
    return spreadSummary(this.evs, 0);
  }

  public ivsSummary() {
    return spreadSummary(this.ivs, this.gen > 2 ? 31 : 15);
  }

  // For copying
  private setEVs(newEVs: StatTable) {
    this.evs = newEVs;
  }
  private setIVs(newIVs: StatTable) {
    this.ivs = newIVs;
  }
  private assignAttributesToCopy(copy: MemberPokemon) {
    this.ability && copy.assignAbility(this.ability);
    this.item && copy.assignItem(this.item);
    for (let idx of ([0, 1, 2, 3] as (MoveSlot)[])) {
      this.moveset[idx] && copy.assignMove(this.moveset[idx], idx);
    }

    copy.setEVs(this.evs);
    copy.setIVs(this.ivs);
    this.nature !== undefined && copy.assignNature(this.nature);

    this.nickname !== undefined && copy.assignNickname(this.nickname);
    copy.assignLevel(this.level);
    this.gender && copy.assignGender(this.gender);
    this.shiny !== undefined && copy.assignShiny(this.shiny);
    this.happiness !== undefined && copy.assignHappiness(this.happiness);
    // Assigning HP type is not necessary, as that is handled by setIVs

    this.pokeball !== undefined && copy.assignPokeball(this.pokeball);
  }

  // Returns a deep copy of this member
  public copy() {
    const copy = new MemberPokemon(this.gqlMember, this.iconDatum, this.gen);

    // Copy move, ability, etc. info 
    this.assignAttributesToCopy(copy);
    return copy;
  }

  // Returns a cosmetic form of this member with the given psID if it exists, otherwise simply this.copy()
  public cosmeticForm(psID: string) {
    const cosmeticFormSelect = this.forms.edges.filter(edge => edge.node.psID === psID);

    // If cosmetic form not found, simply return a copy of this Pokemon
    if (cosmeticFormSelect.length === 0) return this.copy();
    const cosmeticFormDatum = cosmeticFormSelect[0];
    
    const newIconDatum: PokemonIconDatum = {
      ...this.iconDatum,
      // Overwrite name info with cosmetic form's name info
      ...cosmeticFormDatum.node,
    };

    const newFormEdges = this.forms.edges
      // Only select cosmetic forms
      .filter(edge => edge.class === 'COSMETIC')
      // Add on this current form with the 'COSMETIC' flag. Note that cosmetic forms are always filtered out of actual GQL queries, so we can modify the form edges in a way that goes against the GraphQL API (i.e. by assigning 'COSMETIC' to what is possibly the base form).

    // Initialize a new MemberPokemon with the cosmetic form's form and icon data. 
    const cosmeticForm = new MemberPokemon(
      {
        ...this.gqlMember,
        // Overwrite name info
        ...cosmeticFormDatum.node,
        // Overwrite form info
        forms: {
          edges: newFormEdges,
        }
      },
      newIconDatum,
      this.gen,
    );
      
    // Copy move, ability, etc. info 
    this.assignAttributesToCopy(cosmeticForm);
    return cosmeticForm;
  }
}

// Hidden power interfaces and query
// #region

export interface HPTypeQuery {
  types: {
    edges: HPTypeResult[]
  }
}

export interface HPTypeResult {
  node: {
    name: TypeName
  }
}

export interface HPTypeVars {
  gen: GenNum
  
  startsWith: string
  contains: string
}

export const HPTYPE_QUERY = gql`
  query HPTypeQuery(
    $gen: Int!,
    $startsWith: String!, $contains: String!
  ) {
    types(
      generation: $gen,
      filter: {
        startsWith: $startsWith
        contains: $contains
      }
    ) {
      id
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// #endregion