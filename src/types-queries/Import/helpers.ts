import { GenNum, StatTable } from "../helpers";

// Interfaces
// #region

export interface ImportVars {
  gen: GenNum
  psIDs: string[]
}

// #endregion

// Errors
// #region

export class LateIntroductionError extends Error {
  public lateEntities: [string, GenNum][]

  constructor(msg: string, lateEntities: [string, GenNum][]) {
    super(msg);
    this.lateEntities = lateEntities;

    Object.setPrototypeOf(this, LateIntroductionError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LateIntroductionError);
    }

    this.name='LateIntroductionError';
  }
}

// 'msg' holds ability name
export class InvalidAbilityError extends Error {
  public memberName: string
  constructor(msg: string, memberName: string) {
    super(msg);
    this.memberName = memberName;
    Object.setPrototypeOf(this, InvalidAbilityError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAbilityError);
    }

    this.name='InvalidAbilityError';
  }
}

// 'msg' holds item name
export class InvalidItemError extends Error {
  public memberName: string
  constructor(msg: string, memberName: string) {
    super(msg);
    this.memberName = memberName;
    Object.setPrototypeOf(this, InvalidItemError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidItemError);
    }

    this.name='InvalidItemError';
  }
}

// 'msg' holds move name
export class InvalidMoveError extends Error {
  public memberName: string
  constructor(msg: string, memberName: string) {
    super(msg);
    this.memberName = memberName;
    Object.setPrototypeOf(this, InvalidMoveError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidMoveError);
    }

    this.name='InvalidMoveError';
  }
}

// 'msg' holds nature name
export class InvalidNatureError extends Error {
  public memberName: string
  constructor(msg: string, memberName: string) {
    super(msg);
    this.memberName = memberName;
    Object.setPrototypeOf(this, InvalidNatureError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidNatureError);
    }

    this.name='InvalidNatureError';
  }
}

// 'msg' is name of MemberPokemon
export class InvalidStatsError extends Error {
  public memberName: string
  constructor(msg: string, memberName: string) {
    super(msg);
    this.memberName = memberName;
    Object.setPrototypeOf(this, InvalidStatsError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidStatsError);
    }

    this.name='InvalidStatsError';
  }
}

export class PSIDNotFoundError extends Error {
  public indices: number[]

  constructor(msg: string, indices: number[]) {
    super(msg);
    this.indices = indices;

    Object.setPrototypeOf(this, PSIDNotFoundError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PSIDNotFoundError);
    }

    this.name='PSIDNotFoundError';
  }
}

// #endregion

// Functions
// #region

// Converts strings and numbers to psID format (only alphanumeric characters)
export const toPSID = (s: string | number) => {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '')
}

// Parses imported stat tables, which may have missing values; in that case, assign them the defaults depending on gen/mode
export const toStatTable: (
  statTable: {
    hp?: number,
    atk?: number,
    def?: number,
    spa?: number,
    spd?: number,
    spe?: number,
  },
  gen: GenNum, 
  mode: 'ev' | 'iv'
) => StatTable = (statTable, gen, mode) => {
  const defaultEV = gen < 3 ? 252 : 0;
  const defaultIV = gen < 3 ? 15 : 31;
  const defaultValue = mode === 'ev' ? defaultEV : defaultIV;
  return {
    hp: statTable?.hp || defaultValue,
    attack: statTable?.atk !== undefined
      ? statTable.atk
      : defaultValue,
    defense: statTable?.def !== undefined
      ? statTable.def
      : defaultValue,
    specialAttack: statTable?.spa !== undefined
      ? statTable.spa
      : defaultValue,
    specialDefense: statTable?.spd !== undefined
      ? statTable.spd
      : defaultValue,
    speed: statTable?.spe !== undefined
      ? statTable.spe
      : defaultValue,
  };
};

// #endregion