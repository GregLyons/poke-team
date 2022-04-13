// List of 
const restricted = {
  mewtwo: true,
  mewtwomegax: true,
  mewtwomegay: true,
  lugia: true,
  hooh: true,
  kyogre: true,
  kyogreprimal: true,
  groudon: true,
  groudonprimal: true,
  rayquaza: true,
  rayquazamega: true,
  dialga: true,
  palkia: true,
  giratina: true,
  giratinaorigin: true,
  reshiram: true,
  zekrom: true,
  kyurem: true,
  kyuremblack: true,
  kyuremwhite: true,
  xerneas: true,
  yveltal: true,
  zygarde: true,
  zygarde10: true,
  zygarde50: true,
  zygardecomplete: true,
  cosmog: true,
  cosmoem: true,
  solgaleo: true,
  lunala: true,
  necrozma: true,
  necrozmadawnwings: true,
  necrozmaduskmane: true,
  necrozmaultra: true,
  zacian: true,
  zaciancrowned: true,
  zamazenta: true,
  zamazentacrowned: true,
  eternatus: true,
  calyrex: true,
  calyrexice: true,
  calyrexshadow: true,
};

export const isRestricted = (psID: string) => restricted.hasOwnProperty(psID);

const mythical = {
  mew: true,
  celebi: true,
  jirachi: true,
  deoxys: true,
  deoxysattack: true,
  deoxysdefense: true,
  deoxysspeed: true,
  manaphy: true,
  phione: true,
  darkrai: true,
  shaymin: true,
  shayminsky: true,
  arceus: true,
  arceusnormal: true,
  victini: true,
  keldeo: true,
  keldeoresolute: true,
  meloetta: true,
  genesect: true,
  genesectburn: true,
  genesectchill: true,
  genesectdouse: true,
  genesectshock: true,
  diancie: true,
  dianciemega: true,
  hoopa: true,
  hoopaunbound: true,
  volcanion: true,
  magearna: true,
  marshadow: true,
  zeraora: true,
  meltan: true,
  melmetal: true,
  zarude: true,
}

export const isMythical = (psID: string) => mythical.hasOwnProperty(psID);

export const isOther = (psID: string) => !(isRestricted(psID) || isMythical(psID));

export type VGCClass = 'Mythical' | 'Restricted' | 'Other';

export const VGC_CLASSES: VGCClass[] = ['Mythical', 'Restricted', 'Other'];

export const psIDToVGCClass: (psID: string) => VGCClass = psID => {
  if (isRestricted(psID)) return 'Restricted';
  else if (isMythical(psID)) return 'Mythical';
  else return 'Other';
}