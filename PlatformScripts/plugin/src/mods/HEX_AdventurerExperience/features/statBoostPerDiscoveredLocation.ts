import { Game, on, once, Spell, TrackedStatsEvent } from "skyrimPlatform";
import Global from "../../../utils/global";
import Feature from "../../../core/feature";
import { TrackedStat } from "../../../skyrim/trackedStat.enum";
import { ModsList } from "../../modsList.enum";
import AdventurerExpirienceData from "../data/adventurerExpirienceData";
import SpellData from "src/utils/interfaces/spellData.interface";

export default class StatBoostPerDiscoveredLocation extends Feature {
  public readonly Name = "StatBoostPerDiscoveredLocation";

  private readonly _eventHandlerName = "RefreshAdventurierBonuses";
  private readonly _mod = Global.Context.GetMod(
    ModsList.HEX_AdventurerExperience
  );
  private readonly _spells = [
    AdventurerExpirienceData.Spells.HEX_SPELL_AdventurierExpirience0,
    AdventurerExpirienceData.Spells.HEX_SPELL_AdventurierExpirience1,
    AdventurerExpirienceData.Spells.HEX_SPELL_AdventurierExpirience2,
    AdventurerExpirienceData.Spells.HEX_SPELL_AdventurierExpirience3,
  ];

  public Enable(): void {
    Global.Context.SafeSubscribe(
      on("trackedStats", (event) => {
        this.EventHandler(event);
      }),
      this._eventHandlerName
    );
  }
  public Disable(): void {
    Global.Context.Unsubscribe(this._eventHandlerName);
    Global.Context.Unsubscribe("UpdateEvent");
  }

  private EventHandler(value: TrackedStatsEvent): void {
    if (value.statName !== TrackedStat.DungeonsCleared) return;
    if (this._mod === null) return;

    for (let i = 0; i < this._spells.length; i++) {
      const spell = this._spells[i];

      if (this.HasSpell(spell)) {
        this.RemoveSpell(spell);
        once("update", () => {
          this.AddSpell(spell, value.newValue, true);
        });
      }

      this.AddSpell(spell, value.newValue);
    }
  }
  private HasSpell(spell: SpellData): boolean {
    const spellForm = this.GetSpell(spell);
    const player = Game.getPlayer()!;
    return player.hasSpell(spellForm);
  }
  private GetSpell(spell: SpellData): Spell | null {
    const asset = this._mod?.GetAsset(spell.name)!;
    const form = Game.getFormEx(asset.NumericId);
    return Spell.from(form)!;
  }
  private AddSpell(
    spell: SpellData,
    power: number,
    silent: boolean = false
  ): void {
    const spellForm = this.GetSpell(spell);
    const player = Game.getPlayer()!;

    const effectsCount = spellForm?.getMagicEffects()?.length!;

    for (let j = 0; j < effectsCount; j++) {
      const data = spell.effectsData.find((effect) => effect.index == j);

      if (data === undefined) continue;

      const magnitude = Math.floor(power / data.divider) * data.value;
      spellForm?.setNthEffectMagnitude(j, magnitude);
    }

    player.addSpell(spellForm, !silent);
  }
  private RemoveSpell(spell: SpellData): void {
    const spellForm = this.GetSpell(spell);
    const player = Game.getPlayer()!;
    player.removeSpell(spellForm);
  }
}
