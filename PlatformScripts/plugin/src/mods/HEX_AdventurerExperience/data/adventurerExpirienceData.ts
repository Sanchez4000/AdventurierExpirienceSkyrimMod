import { printConsole } from "skyrimPlatform";
import BaseData from "src/utils/interfaces/baseData.interface";
import SpellData from "src/utils/interfaces/spellData.interface";

type BaseContainerType<T> = { [key: string]: T };

export default class AdventurerExpirienceData {
  public static readonly Weapons: BaseContainerType<BaseData> = {
    HEX_ITMW_TESTMOD_Testweapon: {
      hexId: "002DB4",
      name: "HEX_ITMW_TESTMOD_Testweapon",
    },
  };
  public static readonly WeaponsList: BaseData[] = this.fill(this.Weapons);

  public static readonly ActiveMagicEffects: BaseContainerType<BaseData> = {
    HEX_MGEF_FortifyHealth: {
      hexId: "003DDC",
      name: "HEX_MGEF_FortifyHealth",
    },
    HEX_MGEF_FortifyStamina: {
      hexId: "003DDD",
      name: "HEX_MGEF_FortifyStamina",
    },
    HEX_MGEF_FortifyMagicka: {
      hexId: "003DDE",
      name: "HEX_MGEF_FortifyMagicka",
    },
    HEX_MGEF_HealthRegen: {
      hexId: "003DDF",
      name: "HEX_MGEF_HealthRegen",
    },
    HEX_MGEF_StaminaRegen: {
      hexId: "003DE0",
      name: "HEX_MGEF_StaminaRegen",
    },
    HEX_MGEF_MagickaRegen: {
      hexId: "003DE1",
      name: "HEX_MGEF_MagickaRegen",
    },
    HEX_MGEF_ResistMagic: {
      hexId: "003DE2",
      name: "HEX_MGEF_ResistMagic",
    },
    HEX_MGEF_ResistFire: {
      hexId: "003DE3",
      name: "HEX_MGEF_ResistFire",
    },
    HEX_MGEF_ResistFrost: {
      hexId: "003DE4",
      name: "HEX_MGEF_ResistFrost",
    },
    HEX_MGEF_ResistElectric: {
      hexId: "003DE5",
      name: "HEX_MGEF_ResistElectric",
    },
    HEX_MGEF_ResistDamage: {
      hexId: "003DE6",
      name: "HEX_MGEF_ResistDamage",
    },
    HEX_MGEF_FortifyDamage: {
      hexId: "003DE7",
      name: "HEX_MGEF_FortifyDamage",
    },
    HEX_MGEF_FortifyDamageDescription: {
      hexId: "00434C",
      name: "HEX_MGEF_FortifyDamageDescription",
    },
    HEX_MGEF_AttributesDescription: {
      hexId: "005377",
      name: "HEX_MGEF_AttributesDescription",
    },
    HEX_MGEF_ResistElementDescription: {
      hexId: "005378",
      name: "HEX_MGEF_ResistElementDescription",
    },
    HEX_MGEF_FortifyCarryWeight: {
      hexId: "0058DD",
      name: "HEX_MGEF_FortifyCarryWeight",
    },
    HEX_MGEF_ResistPoitions: {
      hexId: "005E41",
      name: "HEX_MGEF_ResistPoitions",
    },
    HEX_MGEF_ResistDisease: {
      hexId: "005E40",
      name: "HEX_MGEF_ResistDisease",
    },
    HEX_MGEF_ResistBadEffects: {
      hexId: "005E42",
      name: "HEX_MGEF_ResistBadEffects",
    },
  };
  public static readonly ActiveMagicEffectsList: BaseData[] = this.fill(
    this.ActiveMagicEffects
  );

  public static readonly Spells: BaseContainerType<SpellData> = {
    HEX_SPELL_AdventurierExpirience0: {
      hexId: "00434B",
      name: "HEX_SPELL_AdventurierExpirience0",
      effectsData: [
        {
          gameName: "Повышение урона оружием",
          index: 0,
          divider: 1,
          value: 0.01,
        },
        {
          gameName: "Повышение брони",
          index: 1,
          divider: 1,
          value: 10,
        },
        {
          gameName: "Описание повышения урона оружием",
          index: 2,
          divider: 1,
          value: 1,
        },
        {
          gameName: "Повышение переносимого веса",
          index: 3,
          divider: 1,
          value: 10,
        },
      ],
    },
    HEX_SPELL_AdventurierExpirience1: {
      hexId: "00434E",
      name: "HEX_SPELL_AdventurierExpirience1",
      effectsData: [
        {
          gameName: "Повышение здоровья",
          index: 0,
          divider: 10,
          value: 15,
        },
        {
          gameName: "Повышение запаса сил",
          index: 1,
          divider: 10,
          value: 15,
        },
        {
          gameName: "Повышение магии",
          index: 2,
          divider: 10,
          value: 15,
        },
        {
          gameName: "Регенерация здоровья",
          index: 3,
          divider: 10,
          value: 1,
        },
        {
          gameName: "Регенерация запаса сил",
          index: 4,
          divider: 10,
          value: 1,
        },
        {
          gameName: "Регенерация магии",
          index: 5,
          divider: 10,
          value: 1,
        },
        {
          gameName: "Повышение атрибутов",
          index: 6,
          divider: 10,
          value: 15,
        },
        {
          gameName: "Повышение регенерации",
          index: 7,
          divider: 10,
          value: 1,
        },
      ],
    },
    HEX_SPELL_AdventurierExpirience2: {
      hexId: "00434F",
      name: "HEX_SPELL_AdventurierExpirience2",
      effectsData: [
        {
          gameName: "Сопротивление магии",
          index: 0,
          divider: 2,
          value: 1,
        },
        {
          gameName: "Сопротивление огню",
          index: 1,
          divider: 1,
          value: 1,
        },
        {
          gameName: "Сопротивление холоду",
          index: 2,
          divider: 1,
          value: 1,
        },
        {
          gameName: "Сопротивление электричеству",
          index: 3,
          divider: 1,
          value: 1,
        },
        {
          gameName: "Сопротивление элементам",
          index: 4,
          divider: 1,
          value: 1,
        },
      ],
    },
    HEX_SPELL_AdventurierExpirience3: {
      hexId: "005E43",
      name: "HEX_SPELL_AdventurierExpirience3",
      effectsData: [
        {
          gameName: "Сопротивление болезням",
          index: 0,
          divider: 1,
          value: 2,
        },
        {
          gameName: "Сопротивление ядам",
          index: 1,
          divider: 1,
          value: 2,
        },
        {
          gameName: "Сопротивление ядам и болезням",
          index: 2,
          divider: 1,
          value: 2,
        },
      ],
    },
  };
  public static readonly SpellsList: SpellData[] = this.fill(this.Spells);

  public static get AllAssets(): BaseData[] {
    return [
      ...this.WeaponsList,
      ...this.ActiveMagicEffectsList,
      ...this.SpellsList,
    ];
  }

  private static fill<T>(source: BaseContainerType<T>): T[] {
    const result: T[] = [];

    for (const key in source) {
      result.push(source[key]);
    }

    return result;
  }
}
