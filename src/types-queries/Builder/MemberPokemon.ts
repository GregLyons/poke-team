import { gql } from "@apollo/client"
import { PokemonSet } from "@pkmn/data"
import { StatsTable } from "@pkmn/data"
import { Dex } from "@pkmn/dex"
import { Data, Sets } from "@pkmn/sets"
import { BaseStatName, CapsTypeName, GenerationNum, IntroductionEdge, introductionEdgeToGen, PokemonIconDatum, StatTable, toTypeName, TypeName } from "../helpers"
import { EnablesItemEdge, PokemonFormDatum, PokemonFormEdge, pokemonFormEdgeToFormDatum, RequiresItemEdge, spreadSummary, } from "./helpers"
import { MemberAbility } from "./MemberAbility"
import { enablesItemEdgeToMemberItem, MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem"
import { MemberMove } from "./MemberMove"
import { MemberNature } from "./MemberNature"

export type MemberPokemonVars = {
  gen: GenerationNum
  psID: string
}

export type MemberPokemonFromIconQuery = {
  pokemonByPSID: MemberPokemonFromIconQueryResult[]
}

export type MemberPokemonFromIconQueryResult = {
  id: string
  name: string
  speciesName: string

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
}

export const POKEMONICON_TO_MEMBER_QUERY = gql`
  query PokemonIconToMemberQuery($gen: Int! $psID: String!) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      name
      speciesName
      
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
          }
        }
      }
    }
  }
`;

export const DefaultEVSpread: StatTable = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
}

export const DefaultEVSpreadGens12: StatTable = {
  hp: 252,
  attack: 252,
  defense: 252,
  specialAttack: 252,
  specialDefense: 252,
  speed: 252,
}

export const DefaultIVSpread: StatTable = {
  hp: 31,
  attack: 31,
  defense: 31,
  specialAttack: 31,
  specialDefense: 31,
  speed: 31,
}

export const DefaultDVSpread: StatTable = {
  hp: 15,
  attack: 15,
  defense: 15,
  specialAttack: 15,
  specialDefense: 15,
  speed: 15,
}

export const statTableToPSStatsTable: (statTable: StatTable) => StatsTable<number> = statTable => {
  return {
    hp: statTable.hp,
    atk: statTable.attack,
    def: statTable.defense,
    spa: statTable.specialAttack,
    spd: statTable.specialDefense,
    spe: statTable.speed,
  };
}

export type GenderName = 'M' | 'F' | 'N';

export type NatureName = 'adamant' | 'bashful' | 'bold' | 'brave' | 'calm' | 'careful' | 'docile' | 'gentle' | 'hardy' | 'hasty' | 'impish' | 'jolly' | 'lax' | 'lonely' | 'mild' | 'modest' | 'naive' | 'naughty' | 'quiet' | 'quirky' | 'rash' | 'relaxed' | 'sassy' | 'serious' | 'timid';

export type FormattedNatureName = 'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' |
'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' |
'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' |
'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' |
'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';

export const natureNameToFormattedNatureName = (natureName: NatureName) => {
  return ((natureName.charAt(0).toUpperCase() + natureName.slice(1)) as FormattedNatureName);
}

export const formattedNatureNameToNatureName = (formattedNatureName: FormattedNatureName) => {
  return (formattedNatureName.toLowerCase() as NatureName);
}

export class MemberPokemon {
  public id: string
  public name: string
  public formattedName: string
  public speciesName: string
  public psID: string
  public typing: TypeName[]
  public baseStats: StatTable

  public iconDatum: PokemonIconDatum

  public gen: GenerationNum
  public introduced: GenerationNum
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

  public gender?: GenderName
  public nickname?: string
  public shiny?: boolean
  public happiness?: number

  // For keeping track of G-max
  public formClass: string

  // Handling cosmetic forms
  private forms: {
    edges: PokemonFormEdge[]
  }
  // An array including the icon data for this Pokemon's cosmetic forms. Note that if this Pokemon is itself a cosmetic form, then the base form will be listed as a cosmetic form here.
  public cosmeticForms: PokemonIconDatum[]

  // For making copy
  private gqlMember: MemberPokemonFromIconQueryResult

  constructor(gqlMember: MemberPokemonFromIconQueryResult, pokemonIconDatum: PokemonIconDatum, gen: GenerationNum) {
    const {
      formattedName, psID,
      typing, baseStats, 
      removedFromSwSh, removedFromBDSP,
    } = pokemonIconDatum;
    
    this.iconDatum = pokemonIconDatum;

    const { 
      id, name, speciesName,
      introduced, 
      enablesItem, requiresItem,
      formClass, forms,
    } = gqlMember;

    this.gqlMember = gqlMember;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.psID = psID;
    this.speciesName = speciesName;

    this.typing = typing;
    this.baseStats = baseStats;

    this.introduced = introductionEdgeToGen(introduced.edges[0]);
    this.gen = gen;
    this.removedFromSwSh = removedFromSwSh;
    this.removedFromBDSP = removedFromBDSP;

    this.moveset = [null, null, null, null];

    if (gen < 3) {
      this.evs = DefaultEVSpreadGens12;
      this.ivs = DefaultDVSpread;
    }
    else {
      this.evs = DefaultEVSpread;
      this.ivs = DefaultIVSpread;
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
        const { id, name, psID, formattedName, speciesName } = d;
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
      gigantamax: this.formClass === 'GMAX',
    };

    return pokemonSet;
  }

  public toSetString() {
    return Sets.toString(this.toPokemonSet(), Dex.forGen(this.gen));
  }

  // #endregion

  public setGen(newGen: GenerationNum) {
    this.gen = newGen;
  }

  public assignAbility(newAbility: MemberAbility) {
    this.ability = newAbility;
  }

  public assignMove(newMove: MemberMove | null, slot: 0 | 1 | 2 | 3) {
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
    for (let idx of ([0, 1, 2, 3] as (0 | 1 | 2 | 3)[])) {
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

// Importing Pokemon sets
// #region

export type MemberPokemonFromSetQuery = {
  pokemonByPSIDs: MemberPokemonFromSetQueryResult[]
}

// This is a combination of the data contained in a PokemonIconDatum, as well as MemberPokemonFromIconQueryResult, both of which are necessary to create a MemberPokemon instance
export type MemberPokemonFromSetQueryResult = {
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
}

export const POKEMONSET_TO_MEMBER_QUERY = gql`
  query PokemonSetToMemberQuery($gen: Int! $psIDs: [String!]!) {
    pokemonByPSIDs(generation: $gen, psIDs: $psIDs) {
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
          }
        }
      }
    }

    }
  }
`;

export class LateIntroductionError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, LateIntroductionError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LateIntroductionError);
    }

    this.name='LateIntroductionError';
  }
}

export const setsToMembers: (data: MemberPokemonFromSetQuery, gen: GenerationNum) => MemberPokemon[] = (data, gen) => {
  let lateMembers: [string, GenerationNum][] = [];

  const gqlMembers: MemberPokemonFromIconQueryResult[] = data.pokemonByPSIDs.map(d => {
    // Check for late members
    if (d.introduced.edges[0].node.number > gen) lateMembers = lateMembers.concat([d.formattedName, d.introduced.edges[0].node.number]);

    return {
      ...d,
    };
  });

  // Throw error if a member was introduced later than 'gen'
  if (lateMembers.length > 0) throw new LateIntroductionError('');

  const pokemonIconData: PokemonIconDatum[] = data.pokemonByPSIDs.map(d => {
    return {
      ...d,
      typing: d.typeNames.map(toTypeName),
    };
  });

  let constructorData: {
    gqlMember: MemberPokemonFromIconQueryResult
    pokemonIconDatum: PokemonIconDatum
    gen: GenerationNum
  }[] = [];
  for (let i: number = 0; i < Math.min(gqlMembers.length, pokemonIconData.length); i++) {
    constructorData = constructorData.concat([{
      gqlMember: gqlMembers[i],
      pokemonIconDatum: pokemonIconData[i],
      gen,
    }]);
  }

  return constructorData.map(d => new MemberPokemon(d.gqlMember, d.pokemonIconDatum, d.gen));
}

// #endregion