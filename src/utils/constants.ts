// Entity classes
// #region

export type EntityClass = 'Ability' | 'Effect' | 'Field state' | 'Item' | 'Move' | 'Stat' | 'Status' | 'Type' | 'Usage method';

export type EntityLink = 'abilities' | 'effects' | 'fieldStates' | 'items' | 'moves' | 'stats' | 'statuses' | 'types' | 'usageMethods';

export const ENTITYCLASS_TO_PLANNERLINK = new Map<EntityClass, EntityLink>([
  ['Ability', 'abilities'],
  ['Effect', 'effects'],
  ['Field state', 'fieldStates'],
  ['Item', 'items'],
  ['Move', 'moves'],
  ['Stat', 'stats'],
  ['Status', 'statuses'],
  ['Type', 'types'],
  ['Usage method', 'usageMethods'],
]);

// #endregion

export const NUMBER_OF_GENS = 8;

// 'THIS_IS_ENUM_CASE' => 'This is title case'
export const ENUMCASE_TO_TITLECASE = (enumCase: string): string => {
  const temp = enumCase.split('_').join(' ').toLowerCase();
  return temp.charAt(0).toUpperCase() + temp.substring(1);
}