import BaseData from "./baseData.interface";

export default interface SpellData extends BaseData {
  effectsData: EffectData[];
}

interface EffectData {
  gameName: string;
  index: number;
  divider: number;
  value: number;
}
