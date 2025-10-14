import { Game, on, Spell, TrackedStatsEvent } from "skyrimPlatform";
import Global from "../../../utils/global";
import Feature from "../../../core/feature";
import { TrackedStat } from "../../../skyrim/trackedStat.enum";
import { ModsList } from "../../modsList.enum";
import AdventurerExpirienceData from "../data/adventurerExpirienceData";

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
  }

  private EventHandler(value: TrackedStatsEvent): void {
    if (value.statName !== TrackedStat.DungeonsCleared) return;
    if (this._mod === null) return;

    const player = Game.getPlayer()!;

    for (let i = 0; i < this._spells.length; i++) {
      const spell = this._spells[i];
      const asset = this._mod.GetAsset(spell.name)!;
      const spellForm = Spell.from(Game.getFormEx(asset.NumericId));

      if (player.hasSpell(spellForm)) {
        player.removeSpell(spellForm);
      }

      const effectsCount = spellForm?.getMagicEffects()?.length!;

      for (let j = 0; j < effectsCount; j++) {
        const data = spell.effectsData.find((effect) => effect.index == j);

        if (data === undefined) continue;

        const magnitude =
          Math.floor(value.newValue / data.divider) * data.value;
        spellForm?.setNthEffectMagnitude(j, magnitude);
      }

      player.addSpell(spellForm, true);
    }
  }
}
